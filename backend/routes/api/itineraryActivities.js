const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Itinerary = mongoose.model('Itinerary');
const Activity = mongoose.model('Activity');
const validateActivityInput = require('../../validation/activity');

//CREATE ACTIVITY ROUTE 
router.post(
    '/:itineraryId/activities', 
    validateActivityInput,
    async (req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.itineraryId);
        const newActivity = new Activity({
           itineraryId: itinerary._id,
           title: req.body.title,
           date: req.body.date,
           place: req.body.place,
           description: req.body.description
     });
     const activity = await newActivity.save();
     itinerary.activities.push(activity._id)
     itinerary.save();
     return res.json({
        activity: newActivity
     })
    } catch(err) {
        next(err);
    }
});

// GET ALL ACTIVITIES FOR ITINERARY ID 

router.get('/:itineraryId/activities', async (req, res, next) => {
    try {
        const foundItinerary = await Itinerary.findById(req.params.itineraryId);
        const activities = await Activity
                                    .find()
                                    .where({'_id': { $in: foundItinerary.activities }})
        let allActivities = {};
        activities.forEach((activity) => {
            allActivities[activity._id] = activity
        })
        return res.json({
            activities: allActivities
        });
    } catch(err) {
        next(err);
    };
});

module.exports = router;