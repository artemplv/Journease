const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Itinerary = mongoose.model('Itinerary');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const { loginUser, restoreUser } = require('../../config/passport');
const DEFAULT_PROFILE_IMAGE_URL = 'https://journease-artemplv.s3.amazonaws.com/blank-profile-picture-973460_1280.webp'; 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { isProduction } = require('../../config/keys');


router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email
  });
})

router.get('/:id', async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const userItineraries = await Itinerary.find({ownerId: req.params.id});
    return res.json({
      user,
      userItineraries
    });
  } catch(err) {
    const error = new Error('User does not exist');
    error.statusCode = 404;
    error.errors = { message: 'User with provided Id does not exist'};
    return next(error);
  }
})



router.post(
  '/register', 
  singleMulterUpload("image"),
  validateRegisterInput, 
  async (req, res, next) => {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });    
    
    if (user) {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      if (user.email === req.body.email) {
        errors.email = "A user has already registered with this email";
      }
      if (user.username === req.body.username) {
        errors.username = "A user has already registered with this username";
      }
      err.errors = errors;
      return next(err);
    }
    const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      DEFAULT_PROFILE_IMAGE_URL;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      profileImageUrl
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
        }
        catch(err) {
          next(err);
        }
      })
    });
  }
);


router.post(
  '/login', 
  singleMulterUpload(""), 
  validateLoginInput, 
  async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

module.exports = router;
