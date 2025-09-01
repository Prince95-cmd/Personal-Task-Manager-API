const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_CONNECTION_URL;
function connectToMongoDB(){
    mongoose.connect(mongoURL);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    })
    mongoose.connection.on('error', (err) => {
        console.log(err);
        console.log('Error connecting to MongoDB:');
    })
}

module.exports = {connectToMongoDB};