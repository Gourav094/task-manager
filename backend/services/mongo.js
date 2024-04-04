const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connection.once('open',() => {
    console.log(`Connected to mongo..`)
})

mongoose.connection.on('error',() => {
    console.log(`Error during connecting to mongo`)
})

async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URL)
}

module.exports = connectMongo