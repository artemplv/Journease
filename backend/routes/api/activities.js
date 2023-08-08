const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Itinerary = mongoose.model('Itinerary');
const Activity = require("../../models/Activity");

//CREATE ACTIVITY, ADD TO ITINERARY - WILL RETURN ENTIRE ITINERARY
router.post('/:id/activities', async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        const newActivity = new Activity({
           itineraryId: itinerary._id,
           name: req.body.name,
           date: req.body.date,
           place: req.body.place,
           category: req.body.category
     });
     const activity = await newActivity.save();
     itinerary.activities.push(activity);
     const newItinerary = await itinerary.save();
     return res.json({
        itinerary: newItinerary
     })
    } catch(err) {
        next(err);
    }
});

//SHOW ACTIVITY
router.get('/:id/activities/:activityId', async (req, res) => {
    try {
        // const foundItinerary = await Itinerary.findById(req.params.id);
        const foundActivity = await Activity.findById(req.params.activityId);
        return res.json({
            activity: foundActivity
        });
    } catch(err) {
        next(err);
    };
});

module.exports = router;