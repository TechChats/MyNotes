const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


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

            //creating user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            console.log(req.body)
            res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }
    })

module.exports = router