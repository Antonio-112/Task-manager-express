/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {verifyToken} = require('../services/middlewares/auth');
const {validateCreateTask, validateUpdateTask} = require('../services/validators/task');

const {create,
  tasksCount,
  listAll,
  remove,
  remove2,
  read} = require('../controllers/tasks');

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
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
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */
router.post('/task', validateCreateTask, verifyToken, create);

/**
 * @swagger
 * /task/total:
 *   get:
 *     summary: Count the number of tasks
 *     tags: [Task]
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
 *               type: number
 *               items:
 *                 number: integer
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */
router.get('/tasks/total', verifyToken, tasksCount);


/**
 * @swagger
 * /task/:count:
 *   get:
 *     summary: List a limited number of tasks
 *     tags: [Task]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         format: bearer
 *         required: true
 *         description: Bearer token
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */
router.get('/tasks/:count', verifyToken, listAll);

/**
 * @swagger
 * /task:slug:
 *   patch:
 *     summary: Update a task
 *     tags: [Task]
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
 *               category:
 *                 type: string
 *               inProgress:
 *                type: enum
 *                enum:
 *                  - yes
 *                  - no
 *                color:
 *                  type: enum
 *                  enum:
 *                    - Black
 *                    - Brown
 *                    - Silver
 *                    - White
 *                    - Blue
 *                    - Gray
 *               status:
 *                 type: enum
 *                 enum:
 *                   - Active
 *                   - Inactive
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       400:
 *         description: bad request
 *       401:
 *         description: invalid credentials
 */
router.patch('/task/:slug', validateUpdateTask, verifyToken, remove);

/**
 * @swagger
 * /task/:slug:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
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
 */
router.delete('/task/:slug', verifyToken, remove2);

/**
 * @swagger
 * /task/:slug:
 *    get:
 *     summary: "Get a task by slug"
 *     task:slug: [Task]
 *     tags: [Task]
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
 */
router.get('/task/:slug', read);
// router.put('/task/:slug', update)

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - inProgress
 *       properties:
 *         name:
 *            type: string
 *            example: "Task 1"
 *            description: "Task name"
 *            minLength: 2
 *            maxLength: 32
 *         description:
 *            type: string
 *            example: "This is a task"
 *            description: "Task description"
 *            maxLength: 2000
 *         category:
 *              $ref: "#/components/schemas/Category"
 *         inProgress:
 *           type: string
 *           description: "Yes or No"
 *           example: "Yes"
 *           enum:
 *             - Yes
 *             - No
 *         color:
 *            type: string
 *            description: "Task color"
 *            example: "Blue"
 *            enum:
 *             - Black
 *             - Brown
 *             - Silver
 *             - White
 *             - Blue
 *             - Gray
 *         status:
 *            type: String
 *            description: "Task status"
 *            default: "Active"
 *            enum:
 *              - Active
 *              - Inactive
 *       example:
 *        name: "Task 1"
 *        description: "This is a task"
 *        category: "Category 1"
 *        inProgress: "Yes"
 *        color: "Blue"
 *        status: "Active"
 */

module.exports = router;
