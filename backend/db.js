const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/my_notes"

const connectToMongo = async ()=> {
    await mongoose.connect(mongoURI)
        //check if db is connected
        // console.log(mongoose.connection.readyState)
        if(mongoose.connection.readyState === 1)
            console.log("Connected to Database")   
}

module.exports = connectToMongo;