const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('./../middleware/fetchUser')
const Note = require('../models/Note')


// ROUTE 1: Get All notes of a user using: GET "/api/notes/fetchallnotes" - Login required
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

// ROUTE 2: Add notes for a user using: POST "/api/notes/addnote" - Login required
router.post('/addnote', fetchuser,
    //validation
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 chars long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 chars long'),

    async (req, res) => {

        const { title, description, tag } = req.body;


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

// ROUTE 3: Upadate existing notes for a user using: PUT "/api/notes/updatenote" - Login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {

        const { title, description, tag } = req.body;

        try {

            //create a newNote object and add title, description, tag etc accodingly if these exists
            //i.e if users just want to update the descrition and tag without changing the title he can do it.
            const newNote = {}

            if (title) { newNote.title = title } // if title is present in req body i.e if use want to change the title then add it to newNote obj (updated note).

            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            //find the note to be updated
            let note = await Note.findById(req.params.id) // id from -> /updatenote/:id

            //if not present then send page not found request
            if (!note) {
                return res.status(404).send("Note note Found")
            }

            //now once note is present, then check if the user logged in (whose is trying to update the note) is the original user who had created that note.
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed to update")
            }

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true} ) // new:true ??
            res.json(note)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }

    })



module.exports = router