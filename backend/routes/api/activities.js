const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Activity = mongoose.model('Activity');

router.delete('/:id', async (req, res, next) => {
    try {
        const foundActivity = await Activity.findById(req.params.id);
        if (!foundActivity) {
            const error = new Error('Activity does not exist');
            error.statusCode = 404;
            error.errors = { message: 'Activity with provided Id not found'};
            return next(error);
        }
        foundActivity.deleteOne();
        return res.json({
            message: 'Activity has been deleted.'
        })
    } catch(err) {
        return next(err);
    }
});

module.exports = router;