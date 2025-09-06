const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {connectToMongoDB} = require('./db');
const taskRoute = require('./routes/task');
const authRoute = require('./routes/auth');
const env = require('dotenv');

require('./authentication/auth'); // Signup and login authentication middleware

env.config();

let PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// Connecting to MongoDB instance
connectToMongoDB();

app.use(express.json());

app.use('/', authRoute);
app.use('/tasks', passport.authenticate('jwt', {session: false}), taskRoute);

// Renders the home page
app.get('/', (req, res) => {
    res.send('Task Manager API');
});

// Handling errors
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500)
    res.json({
        error : err.message
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

