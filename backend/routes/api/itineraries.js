const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { requireUser, restoreUser } = require('../../config/passport');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const validateItineraryInput = require('../../validation/itinerary');
const Itinerary = mongoose.model('Itinerary');
const DEFAULT_COVER_IMAGE_URL = 'https://journease-artemplv.s3.amazonaws.com/photo-1512100356356-de1b84283e18.jpg';

// CREATE ITINERARY
router.post(
    '/', 
    singleMulterUpload("cover"), 
    restoreUser, 
    validateItineraryInput,
    async (req, res, next) => {
    try {
        const coverImageUrl = req.file ? 
            await singleFileUpload({ file: req.file, public: true }) :
            DEFAULT_COVER_IMAGE_URL;
        const newItinerary = new Itinerary({
            ownerId: req.user._id,
            title: req.body.title,
            description: req.body.description,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            collaborators: req.body.collaborators,
            activities: req.body.activities,
            coverImageUrl
        });
        const itinerary = await newItinerary.save();
        return res.json({
            itinerary: itinerary
        });
    } catch (err) {
        return next(err);
    };
});

// INDEX ITINERARY
router.get('/', async (req, res) => {
    try {
        const allItineraries = (await Itinerary.find()
                                                .sort({ createdAt: -1 }));
        let itineraries = {};
        allItineraries.forEach((itinerary) => {
            itineraries[itinerary._id] = itinerary;
        });
        return res.json(
            itineraries = {itineraries}
        );
    } catch(err) {
        return res.json([]);
    };
});

// SHOW ITINERARY
router.get('/:id', async(req, res, next) => {
    try {
        const foundItinerary = await Itinerary.findById(req.params.id);
        return res.json({
            itinerary: foundItinerary
        });
    } catch(err) {
        const error = new Error('Itinerary does not exist');
        error.statusCode = 404;
        error.errors = { message: 'Itinerary with specified Id does not exist.'};
        return next(error);
    };
});

// UPDATE ITINERARY 
router.patch(
    '/:id', 
    singleMulterUpload("cover"),
    requireUser, 
    async(req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            const err = new Error("Itinerary does not exist.");
            err.statusCode = 404;
            err.errors = { itinerary: "Itinerary does not exist."};
            return next(err);
        }
        const coverImageUrl = req.file ? 
        await singleFileUpload({ file: req.file, public: true }) :
        DEFAULT_COVER_IMAGE_URL;

        itinerary.ownerId = itinerary.ownerId;
        itinerary.title = req.body.title || itinerary.title;
        itinerary.description = req.body.description || itinerary.description;
        itinerary.dateStart = req.body.dateStart || itinerary.dateStart;
        itinerary.dateEnd = req.body.dateEnd || itinerary.dateEnd;
        itinerary.collaborators = req.body.collaborators || itinerary.collaborators;
        itinerary.coverImageUrl = coverImageUrl
        itinerary.activities = req.body.activities || itinerary.activities;
        const updatedItinerary = await itinerary.save();
        return res.json({
            itinerary: updatedItinerary
        }) 
    } catch(err) {
        next(err);
    };
})

// DELETE ITINERARY
router.delete('/:id', requireUser, async(req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (itinerary) {
            // && req.user._id.toString() === itinerary.ownerId.toString()
            itinerary.deleteOne();
            return res.json({message: "Itinerary has been deleted."})
        } else {
            return res.json({message: "Itinerary cannot be deleted."})
        }
    } catch(err) {
        const error = new Error('Itinerary does not exist.')
        error.statusCode = 404;
        error.errors = { message: 'Itinerary with specified Id does not exist.'};
        return next(error);
    };
});


module.exports = router;