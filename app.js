const express = require('express');
const {connectToMongoDB} = require('./db');
const taskRoute = require('./routes/task');
require('dotenv').config();

const app = express();

let PORT = process.env.PORT;

// Connecting to MongoDB instance
connectToMongoDB();

app.use(express.json());

app.use('/tasks', taskRoute);

app.get('/', (req, res) => {
    // res.send('Task Manager API');
    res.status(200);
    res.json({
        message: 'Personal Task Manager API'
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

