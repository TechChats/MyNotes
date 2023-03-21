const { Schema, default: mongoose } = require("mongoose");


const NotesSchema = new Schema({

    tilte:{
        type: String,
        required:true
    },

    description:{
        type: String,
        required:true,
        unique:true
    },

    tag:{
        type: String,
        required:true
    },

    date:{
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('notes',NotesSchema)