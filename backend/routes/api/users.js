const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Like = mongoose.model('Like');
const Itinerary = mongoose.model('Itinerary');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
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

router.get('/search', requireUser, async (req, res, next) => {
  const {
    username,
    limit = 10,
  } = req.query;
  
  try {
    const users = await User.find(
      {
        username: { $regex : new RegExp(username, "i") }
      },
      'username email profileImageUrl'
    ).limit(limit);

    const usersData = users.reduce((accum, user) => {
      accum.byId[user.id] = user;
      accum.allIds.push(user.id);
      return accum;
    }, {
      byId: {},
      allIds: []
    });

    res.json({ users: usersData });
  }
  catch(err) {
    next(err);
  }
});

router.get('/:id', async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const userItineraries = await Itinerary.aggregate([
      {
        $match: { ownerId: req.params.id },
      },
      {
          $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'itineraryId',
              as: 'likerIds',
              pipeline: [
                  {
                      $project: {
                          _id: 0,
                          likerId: 1,
                      },
                  },
              ],
            },
      },
      {
          $addFields: { likerIds: "$likerIds.likerId" },
      },
    ]);
    
    const likes = await Like.find({likerId: req.params.id});
    const likedItineraries = likes.map(like => (like.itineraryId));

    const itinerariesIds = userItineraries.map(itinerary => (itinerary._id));
    
    const itinerariesData = {};
    userItineraries.forEach((itinerary) => {
      itinerariesData[itinerary.id] = itinerary
    });

    return res.json({
      user,
      userItineraries: itinerariesData,
      itinerariesIds,
      likedItineraries,
    });
  } catch(err) {
    const error = new Error('User does not exist');
    error.statusCode = 404;
    error.errors = { message: 'User with provided Id does not exist'};
    return next(error);
  }
})

router.patch('/:id', singleMulterUpload("image"), async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const profileImageUrl = await singleFileUpload({ file: req.file, public: true });

    user.profileImageUrl = profileImageUrl;

    const updatedUser = await user.save();

    return res.json({
      user: updatedUser
    })
      
  } catch(err) {
    const error = new Error('An error occured');
    error.statusCode = 404;
    error.errors = { message: 'Unable to update photo'};
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
