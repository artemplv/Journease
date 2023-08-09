const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema ({
    likerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itineraryId: {
        type: Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);