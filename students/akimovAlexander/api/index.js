const express = require('express');
const bodyParser = require('body-parser');
const initChats = require('./chats');
const initMessages = require('./messages');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
});

// chats endpoints
initChats(app);
// messages endpoints
initMessages(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});