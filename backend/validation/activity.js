const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateActivityInput = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title cannot be blank.'),
    check('date')
    .exists({ checkFalsy: true })
    .withMessage('Date must be selected.'),
    check('place')
    .exists({checkFalsey: true})
    .withMessage('Place must be selected'),
    handleValidationErrors
    ];

module.exports = validateActivityInput;