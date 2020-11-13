const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const forgotPassword = require('./controllers/forgotPassword');
const welcome = require('./controllers/welcome');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/seamsville', ({useNewUrlParser: true}))
.then(() => {
    console.log('App now listening to db')
}).catch((error) => {
    throw error
});
app.use('/api/v1/notification/email', forgotPassword);
app.use('/api/v1/notification/email', welcome);

const PORT = 5004;
app.listen(PORT, () => {
    console.log(`email notification system now listening on port ${PORT}`)
});