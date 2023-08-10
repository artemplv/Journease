const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCreateLike = [
    check('itineraryId')
    .exists({ checkFalsy: true })
    .withMessage('Must provide itinerary ID'),
    handleValidationErrors
    ];

module.exports = validateCreateLike;