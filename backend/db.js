const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/my_notes"

const connectToMongo = async ()=> {
    await mongoose.connect(mongoURI).then((mes)=>{
        //check if db is connected
        console.log(mes.connection.readyState)
    })
}

module.exports = connectToMongo;