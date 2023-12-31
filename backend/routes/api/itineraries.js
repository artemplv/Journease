const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { requireUser, restoreUser } = require('../../config/passport');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const validateItineraryInput = require('../../validation/itinerary');
const Like = mongoose.model('Like');
const Itinerary = mongoose.model('Itinerary');
const DEFAULT_COVER_IMAGE_URL = 'https://journease-artemplv.s3.amazonaws.com/photo-1512100356356-de1b84283e18.jpg';


router.get(
    '/search',
    async (req, res, next) => {
        const { title, limit = 5 } = req.query;
        let allItineraries;
        try {
            if (req.query.title === "") {
                allItineraries = await Itinerary.find()
                                                .sort({createdAt: -1})
            } else {
                allItineraries = await Itinerary.find(
                    { title: { $regex: new RegExp(title, 'i')}},
                    '').limit(limit);
            }
            const data = {
                itineraries: {}
            };
            allItineraries.forEach((itinerary) => {
                data.itineraries[itinerary.id] = itinerary;
            })
            res.json(data)
        } catch(err) {
            next(err);
        }
    }
);

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
router.get('/', async (req, res, next) => {
    try {
        const itinerariesList = await Itinerary.aggregate([
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
        // TODO: add sorting, pass array of itineraries ids along with itineraries object
        // .sort({ createdAt: -1 });
        
        const itineraries = itinerariesList.reduce((accum, itinerary) => {
            accum[itinerary._id] = itinerary;
            return accum;
        }, {});
        
        res.json({
            itineraries,
        });
    } catch(err) {
        next(err);
    };
});

// SHOW ITINERARY
router.get('/:id', async(req, res, next) => {
    try {
        const allLikes = (await Like
            .find({'itineraryId': req.params.id}));

        const itineraryLikes = allLikes.map((like) => like.likerId) 
        const foundItinerary = await Itinerary.findById(req.params.id).lean();
        foundItinerary.likerIds = itineraryLikes
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
        itinerary.coverImageUrl;

        itinerary.ownerId = itinerary.ownerId;
        itinerary.title = req.body.title || itinerary.title;
        itinerary.description = req.body.description || itinerary.description;
        itinerary.dateStart = req.body.dateStart || itinerary.dateStart;
        itinerary.dateEnd = req.body.dateEnd || itinerary.dateEnd;
        itinerary.collaborators = req.body.collaborators || itinerary.collaborators;
        itinerary.coverImageUrl = coverImageUrl
        itinerary.activities = (Array.isArray(req.body.activities) && req.body.activities.length > 0)
            ? req.body.activities : itinerary.activities;
        
        const updatedItinerary = await itinerary.save();
        return res.json({
            itinerary: updatedItinerary
        }) 
    } catch(err) {
        next(err);
    };
})

// DELETE ITINERARY
router.delete(
    '/:id', 
    requireUser, 
    async(req, res, next) => {
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