const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {verifyToken} = require('../services/middlewares/auth');

const {getUserInfo,
  getUserCollections,
  getUserCategories,
  getUserTasks} = require('../controllers/user');

router.get('/user', verifyToken, getUserInfo);
router.get('/user/collections', verifyToken, getUserCollections);
router.get('/user/categories', verifyToken, getUserCategories);
router.get('/user/tasks', verifyToken, getUserTasks);

module.exports = router;
