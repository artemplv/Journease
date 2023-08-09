const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    itineraryId: {
        type: Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    place: {
        type: Object,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);