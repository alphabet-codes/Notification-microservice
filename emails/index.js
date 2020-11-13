const express = require('express');
const bodyParser = require('body-parser');
const forgotPassword = require('./controllers/forgotPassword');
const welcome = require('./controllers/welcome');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/notification/email', forgotPassword);
app.use('/api/v1/notification/email', welcome);
app.get('/api/v1/notification/email', (req, res) => {
    return res.send('Welcome to the email notification endpoint')
});

const PORT = 5004;
app.listen(PORT, () => {
    console.log(`email notification system now listening on port ${PORT}`)
});