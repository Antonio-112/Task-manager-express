const express = require("express");
const router = express.Router();

const { create, productsCount, listAll, remove, remove2 } = require("../controllers/product");

router.post('/task', create)
router.get('/tasks/total', productsCount)
router.get('/tasks/:count', listAll)
router.patch('/task/:slug', remove)
router.delete('/task/:slug', remove2) 
// router.get('/task/:slug', read)
// router.put('/task/:slug', update)

module.exports = router;