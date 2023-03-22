const { Schema, default: mongoose } = require("mongoose");


const NotesSchema = new Schema({

    //  we crate a user field to help us to access notes of that specific user.
    //link user and notes model using user id
    user: {
        //get objectId of a different model (here user model)
        type: mongoose.Schema.Types.ObjectId, //like a foreign key
        ref: 'user'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        unique: true
    },

    tag: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('notes', NotesSchema)