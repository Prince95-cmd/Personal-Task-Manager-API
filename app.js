const express = require('express');


const app = express();

let PORT = 3000;

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

