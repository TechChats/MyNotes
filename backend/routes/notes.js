const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('./../middleware/fetchUser')
const Note = require('../models/Note')


// ROUTE 1: Get All notes of a user using: GET "/api/auth/fetchallnotes" - Login required
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            //we fetch notes of user whose id is matched (id extracted from auth token using fetchuser middleware)
            // we have user value in req.user as we user fetchuser middelware 
            const notes = await Note.find({ user: req.user.id })
            res.send(notes)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }

    })

// ROUTE 1: Add notes for a user using: POST "/api/auth/addnote" - Login required
router.post('/addnote', fetchuser, 
    //validation
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 chars long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 chars long'),

    async (req, res) => {

        const {title, description, tag} = req.body;

        
        //if error-> return error and bad request(500)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();
            res.send(note)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }

    })

module.exports = router