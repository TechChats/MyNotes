const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('./../middleware/fetchUser')


//here JWT_SECRET is a secret key used to check weather anyone has tampered the token.
const JWT_SECRET = 'mySecret';

//ROUTE 1: createUser using POST: "/api/auth/createuser" no login required
router.post('/createuser', [

    //validation
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Name must be at least 5 chars long').matches(/\d/).withMessage('must contain a number')],
    async (req, res) => {

        let success = false;
        //if error-> return error and bad request(500)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            //check weather user with same email exists if not set a bad request status (400) also error message
            let user = await User.findOne({ email: req.body.email })
            // console.log(user)

            if (user) {
                return res.status(400).json({ success, error: "User with the same email exists" })
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
            //also we use user id to create a authToken
            const authToken = jwt.sign(data, JWT_SECRET); //sign the token
            success = true
            console.log(authToken)
            res.json({ success, authToken })


        } catch (error) {
            console.error(error.message)
            res.status(500).send("internal server error occured")
        }
    })

// ROUTE 2: Authenticate a user using POST: "/api/auth/login" no login required*
router.post('/login', [
    //validation
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {

    let success = false;
    //if error-> return error and bad request(400)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email }) // ie let user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({ success, error: "User with this email is not found! Please Signup" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(400).json({ success, error: "Password is incorrect" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        //here JWT_SECRET is a secret key used to check weather anyone has tampered the token.
        //also we use user id to create a authToken
        const authToken = jwt.sign(payload, JWT_SECRET); //sign the token
        success = true
        console.log(authToken)
        res.json({ success, authToken }) // res.json({ authToken: authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error occured")
    }

}

)

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser" - Login required

// Where ever we need login, here we use fetchuser MIDDLEWARE, first the middleware will run (here fetchuser) then the next (here async (req,res)... will execute)
router.post('/getuser', fetchUser,
    async (req, res) => {

        let success = false
        //if error-> return error and bad request(400)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }


        try {
            //using the middleware (fetchUser.js) we fetch user data from jwt-tocken and add the user to req
            userId = req.user.id;

            // finding user by id and selection field except password 
            const user = await User.findById(userId).select('-password')
            res.send(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("internal server error occured")
        }

    })


module.exports = router