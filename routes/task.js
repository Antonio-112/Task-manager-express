const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {create,
  tasksCount, listAll, remove, remove2} = require('../controllers/tasks');

router.post('/task', create);
router.get('/tasks/total', tasksCount);
router.get('/tasks/:count', listAll);
router.patch('/task/:slug', remove);
router.delete('/task/:slug', remove2);
// router.get('/task/:slug', read)
// router.put('/task/:slug', update)

module.exports = router;
