const {check, param} = require('express-validator');
const {validateResult} = require('../../../infra/helpers/validateHelper');

const validateCreateCategory = [
  check('name')
      .exists()
      .isString()
      .withMessage('Name should be text')
      .not()
      .isEmpty()
      .withMessage('Name is Required')
      .isLength({min: 2, max: 32})
      .withMessage('Name must be between 2 and 32 characters long'),

  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('description')
      .exists()
      .isString()
      .withMessage('Description should be text')
      .not()
      .isEmpty()
      .withMessage('Description is Required')
      .isLength({max: 128})
      .withMessage('Description must be at most 128 characters long'),

  check('priority')
      .exists()
      .isNumeric()
      .withMessage('Priority should be number')
      .not()
      .isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdateCategory = [


  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('name')
      .exists()
      .isString()
      .withMessage('Title should be text')
      .not()
      .isEmpty()
      .withMessage('Title is Required')
      .isLength({min: 2, max: 32})
      .withMessage('Title must be between 2 and 32 characters long'),

  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('description')
      .exists()
      .isString()
      .withMessage('Description should be text')
      .not()
      .isEmpty()
      .withMessage('Description is Required')
      .isLength({max: 128})
      .withMessage('Description must be at most 128 characters long'),

  check('priority')
      .exists()
      .isNumeric()
      .withMessage('Priority should be number')
      .not()
      .isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateCreateCategory, validateUpdateCategory};
