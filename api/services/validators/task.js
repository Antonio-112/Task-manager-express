const {check, param} = require('express-validator');
const {validateResult} = require('../../../infra/helpers/validateHelper');

const validateCreateTask = [
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
      .isLength({max: 2000})
      .withMessage('Description must be at most 2000 characters long'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdateTask = [
  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

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
      .isLength({max: 2000})
      .withMessage('Description must be at most 2000 characters long'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateCreateTask, validateUpdateTask};
