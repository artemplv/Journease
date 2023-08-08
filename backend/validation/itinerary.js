const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateItineraryInput = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title cannot be blank.'),
    check('dateStart')
    .exists({ checkFalsy: true })
    .withMessage('Start date must be selected.'),
    check('dateEnd')
    .exists({checkFalsey: true})
    .withMessage('End date must be selected'),
    handleValidationErrors
    ];

module.exports = validateItineraryInput;