const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

const mongoURL = process.env.MONGODB_CONNECTION_URL;
function connectToMongoDB(){
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    })
    mongoose.connection.on('error', (err) => {
        console.log(err);
        console.log('Error connecting to MongoDB:');
    })
}

module.exports = {connectToMongoDB};