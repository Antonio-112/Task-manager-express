/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {validateCreateCollection} = require('../services/validators/collection');
const {verifyToken, isAdmin} = require('../services/middlewares/auth');
const {create, listAll, remove, remove2} = require('../controllers/collection');


/**
 * @swagger
 * /collection:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collection]
 *     parameters:
 *       - in: header
 *         name: Authorization
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
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal server error
 */

router.post('/collection', validateCreateCollection, verifyToken, create);


/**
 * @swagger
 * /collection:
 *   get:
 *     summary: "List the specified number of collections"
 *     tags: [Collection]
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       format: bearer
 *       required: true
 *       description: Bearer token
 *     - in: query
 *       name: count
 *       schema:
 *         type: string
 *       required: true
 *       description: Number of collections to return
 *   responses:
 *     200:
 *       description: ok
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/Collection"
 *     400:
 *       description: bad request
 *     401:
 *       description: invalid credentials
 */

router.get('/collections', verifyToken, listAll);

/**
 * @swagger
 * /collection:
 *   patch:
 *     summary: List all collections
 *     tags: [Collection]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         format: bearer
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Collection"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */

router.patch('/collection/:slug', verifyToken, remove);

/**
 * @swagger
 * /collection:
 *   delete:
 *     summary: Delete a collection
 *     tags: [Collection]
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
 *         description: Collection slug
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Collection"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */

router.delete('/collection/:slug', verifyToken, isAdmin, remove2);
// router.get('/collection/:slug', read);

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *       properties:
 *         name:
 *            type: string
 *            example: "Collection 1"
 *            description: "Collection name"
 *            minLength: 2
 *            maxLength: 32
 *         description:
 *            type: string
 *            example: "This is a Collection"
 *            description: "Collection description"
 *            maxLength: 2000
 *         category:
 *              $ref: "#/components/schemas/Category"
 *         tasks:
 *           type: array
 *           default: []
 *           items: "#/components/schemas/Task"
 *         createdBy:
 *              $ref: "#/components/schemas/User"
 *         createdAt:
 *              type: string
 *              format: date-time
 *              example: "2019-01-01T00:00:00.000Z"
 *              description: "Task creation date"
 *         updatedAt:
 *              type: string
 *              format: date-time
 *              example: "2019-01-01T00:00:00.000Z"
 *              description: "Task update date"
 *       example:
 *         name: "Collection 1"
 *         description: "This is a Collection"
 *         category: "Category 1"
 *         tasks: []
 *         createdBy: "User 1"
 *         createdAt: "2019-01-01T00:00:00.000Z"
 *         updatedAt: "2019-01-01T00:00:00.000Z"
 */

module.exports = router;
