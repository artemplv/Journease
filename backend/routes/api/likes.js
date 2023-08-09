const express = require('express');
const mongoose = require('mongoose');
const { restoreUser } = require('../../config/passport');
const validateCreateLike = require('../../validation/like');
const router = express.Router();
const Like = mongoose.model('Like');

router.post(
    '/',
    restoreUser,
    validateCreateLike,
    async (req, res, next) => {
        try {
            const likeExists = (await Like
                                        .find({
                                            'itineraryId': req.body.itineraryId,
                                            'likerId': req.user._id }))
            if (!likeExists.length) {
                const newLike = await new Like({
                    likerId: req.user._id,
                    itineraryId: req.body.itineraryId
                });
                const like = await newLike.save();
                return res.json({
                    like: like 
                });
            } else {
                const err = new Error("Like already exists");
                err.statusCode = 404;
                err.errors = { Likes: "Like already exists." };
                return next(err);
            }
        } catch(error) {
            return next(error);
        };
    }
);

router.delete(
    '/',
    restoreUser,
    async(req, res, next) => {
        try {
            const like = (await Like
                                    .findOne({
                                        'likerId': req.user._id,
                                        'itineraryId': req.body.itineraryId}));
            if (like) {
                like.deleteOne();
                return res.json({ message: "Like has been removed." });
            } else {
                return res.json({ message: "Like does not exist." });
            }
        } catch(err) {
            return next(err);
        };
    }
);

// FETCH FOR LIKES => MUST PASS EITHER ITINERARYID OR LIKERID IN REQUEST 
// NOT SURE IF WE NEED THIS - WILL LEAVE IT FOR NOW
router.get(
    '/',
    async (req, res, next) => {
        let allItineraryLikes;
        try {
            if (req.body.itineraryId) {
                allItineraryLikes = (await Like
                                        .find({"itineraryId": req.body.itineraryId}));
            } else if (req.body.likerId) {
                allItineraryLikes = (await Like
                                        .find({"likerId": req.body.likerId}));
            }
            let likes = {};
            if (!allItineraryLikes.length) {
                const err = new Error("No likes exist");
                err.statusCode = 404;
                err.errors = { Likes: "No likes exist." }
                return next(err);
            } else {
                allItineraryLikes.forEach((like) => {
                    likes[like._id] = like
                })
                return res.json({
                    likes: likes
                });

            };
        } catch(err) {
            return next(err);
        };
    }
);






module.exports = router;
