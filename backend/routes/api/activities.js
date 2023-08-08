const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Activity = mongoose.model('Activity');

router.delete('/:id', async (req, res, next) => {
    try {
        const foundActivity = await Activity.findById(req.params.id);
        if (foundActivity) {
            foundActivity.deleteOne();
            return res.json({message: "Activity has been deleted."})
        } else {
            return res.json({message: "Activity cannot be deleted."})
        }
    } catch(err) {
        return next(err);
    };
});

module.exports = router;