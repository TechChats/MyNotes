const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//here JWT_SECRET is a secret key used to check weather anyone has tampered the token.
const JWT_SECRET = 'mySecret';

router.post('/createuser',

    //validation
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long').matches(/\d/).withMessage('must contain a number'),


    async (req, res) => {

        //if error-> return error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // res.send(req.body)
        // const user = User(req.body)
        // user.save()

        try {

            //check weather user with same email exists if not set a bad request status (400) also error message
            let user = await User.findOne({ email: req.body.email })
            // console.log(user)

            if (user) {
                return res.status(400).json({ error: "User with the same email exists" })
            }

            //securing password //hashing
            const salt = await bcrypt.genSaltSync(10);
            const securePassword = await bcrypt.hash(req.body.password, salt)

            //creating user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })

            // console.log(req.body)


            //here instead of just sending userData as response to user we give token to the user for authentication perpose, once the user has initially authiticated using his email and password in response we give authentication token, so that form next time he can use this token to authenticate
            // res.json(user)

            const data = {
                user: {
                    id: user.id
                }
            }
            //here JWT_SECRET is a secret key used to check weather anyone has tampered the token.
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken)
            res.json({ authToken })


        } catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }
    })

module.exports = router