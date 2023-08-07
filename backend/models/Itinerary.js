const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
    owner: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    collaborators: [{
        collaboratorId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    coverImage: {
        type: String,
        // default: "defaultCoverImageUrl",
        required: false,
    },
    activities: {
        // type: [activitySchema]
        type: []
    },
}, {
    // likes TBD;
    timestamps: true
});


module.exports = mongoose.model('Itinerary', itinerarySchema);