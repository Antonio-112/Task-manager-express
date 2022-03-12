const {check, param} = require('express-validator');
const {validateResult} = require('../../../infra/helpers/validateHelper');

const validateCreateUser = [
  check('email')
      .exists()
      .isString()
      .withMessage('Email should be text')
      .isEmail()
      .not()
      .isEmpty()
      .withMessage('Email is Required'),

  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('password')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Password is Required')
      .isLength({min: 6})
      .withMessage('Password must be at leat 6 characters long'),

  check('name')
      .exists()
      .isString()
      .withMessage('Name should be a String')
      .not()
      .isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSignUser = [
  check('email')
      .exists()
      .isEmail()
      .not()
      .isEmpty()
      .withMessage('Email is Required'),

  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('password')
      .exists()
      .not()
      .isEmpty()
      .withMessage('Password is Required'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];


module.exports = {validateCreateUser, validateSignUser};
