const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

const authRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User signup and login
 */


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

//  Signup route - creates a new user
authRoute.post(
    '/signup', 
    passport.authenticate('signup', {session: false}), 
    async (req, res, next) => {
        res.json({
            message : 'Signup successful',
            user : req.user
        });
    }
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user and get a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecret123
 *     responses:
 *       200:
 *         description: Login successful, returns a secret token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token to use in query params (`?secret_token=yourtoken`)
 *       401:
 *         description: Unauthorized (invalid credentials)
 */

// Login route - authenticates a user and returns a JWT token
authRoute.post(
    '/login',
    async  (req, res, next) =>  {
        passport.authenticate('login', async  (err, user, info) => {
            try {
                if(err){
                    return next(err);
                } if (!user){
                    const error = new Error('Username or password is incorrect');
                    return next(error);
                }

                req.login(user, {session: false}, 
                    async (error) => {
                        if (error) return next(error);

                        // We don't want to store the sensitive information such as the
                        // user password in the token so we pick only the email and id
                        const body = { _id : user._id, email : user.email };

                        // Sign the JWT token and populate the payload with the user email and id
                        const token = jwt.sign({user : body}, process.env.JWT_SECRET);

                        // Send back the token to the user
                        return res.json({ token });
                    })
            } catch (error){
                return next(error);
            }
        }) (req, res, next);
    }
)

module.exports = authRoute;

