/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {validateCreateCategory, validateUpdateCategory} = require('../services/validators/category');
const {verifyToken} = require('../services/middlewares/auth');
const {create, update, deleteCategory} = require('../controllers/category');

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new Category
 *     tags: [Category]
 *     parameters:
 *       - in: header
 *         name: Authorization∫
 *         schema:
 *           type: string
 *         format: bearer
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: number
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */

router.post('/category', verifyToken, validateCreateCategory, create);

/**
 * @swagger
 * /category/:slug:
 *   patch:
 *     summary: Update a Category
 *     tags: [Category]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         format: bearer
 *         required: true
 *         description: Bearer token
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug of the Category
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Category"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */

router.patch('/update/:slug', verifyToken, validateUpdateCategory, update);
router.delete('/delete/:slug', verifyToken, deleteCategory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *           example: "Category 1"
 *           minLength: 2
 *           maxLength: 32
 *         description:
 *           type: string
 *           description: Category description
 *           example: "This is a category"
 *           maxLength: 128
 *         priority:
 *           type: number
 *           description: Category priority
 *           example: 0
 *           default: 0
 *       example:
 *         name: "John"
 *         description: "This is a category"
 *         priority: 0
 */

module.exports = router;
