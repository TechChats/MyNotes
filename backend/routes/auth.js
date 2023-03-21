const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


router.post('/',

    //validation
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long').matches(/\d/).withMessage('must contain a number'),


    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)
        // res.send(req.body)
        // const user = User(req.body)
        // user.save()

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }).then(user => res.json(user)).catch(error =>{
            console.log(error)
            res.json({ Message: 'Please enter unique email id', Error: error.message})
          });

    })

module.exports = router