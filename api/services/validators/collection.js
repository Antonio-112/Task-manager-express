const {check, param} = require('express-validator');
const {validateResult} = require('../../../infra/helpers/validateHelper');

const validateCreateCollection = [
  check('name')
      .exists()
      .isString()
      .withMessage('Name should be text')
      .not()
      .isEmpty()
      .withMessage('Name is Required'),

  param('slug').isLowercase().withMessage('Slug should be pas in lowercase'),

  check('description')
      .exists()
      .isString()
      .withMessage('Description should be text')
      .not()
      .isEmpty()
      .withMessage('Description is Required'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {validateCreateCollection};
