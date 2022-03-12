/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {validateCreateUser, validateSignUser} = require('../services/validators/user');
const {registerUser, signUser} = require('../controllers/auth');
const {giveAdminRole, isAdmin} = require('../services/middlewares/auth');

/**
 * @swagger
 *  /register-user:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: bad request
 */

router.post('/register-user', validateCreateUser, registerUser);

/**
 * @swagger
 * /register-admin:
 *   post:
 *     summary: Register Admin
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         format: bearer
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       description: Operation that allow to generate admin account or give admin role to an existing user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: bad request
 */

router.post('/register-admin', validateCreateUser, isAdmin, giveAdminRole, registerUser);


/**
 * @swagger
 * /sign-user:
 *   post:
 *     summary: Sign user
 *     tags: [Auth]
 *     security:
 *       - apiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               token:
 *                 type: token
 *       400:
 *         description: bad request
 *       404:
 *         description: user not found
 *       401:
 *         description: invalid credentials
 */

router.post('/sign-user', validateSignUser, signUser);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *         - lastname
 *       properties:
 *         email:
 *            type: string
 *            index: true
 *         password:
 *            type: string
 *            minLength: 6
 *         name:
 *           type: string
 *           maxLength: 30
 *         lastname:
 *           type: string
 *           maxLength: 30
 *         role:
 *            type: string
 *            default: "subscriber"
 *         image:
 *            type: String
 *            default: []
 *         collections:
 *            type: array
 *            default: []
 *            items:
 *              $ref: "#/components/schemas/Collection"
 *       example:
 *         name: "John"
 *         email: "John@Email.com"
 *         role: subscriber
 *         lastname: "Doe"
 *         image: "default.jpg"
 *         collections: []
 */
