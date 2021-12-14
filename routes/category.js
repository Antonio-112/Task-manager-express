const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {create} = require('../controllers/category');

// Create other routes
router.post('/category', create);

module.exports = router;
