const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const follows = require('./controllers/follow');
const notification = require('./controllers/notification');
const subscriber = require('./controllers/subscriber');
const like = require('./controllers/like');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/seamsville', ({useNewUrlParser: true}))
.then(() => {
    console.log('App now listening to db')
}).catch((error) => {
    throw error
});
app.use('/notification/push', notification);
app.use('/notification/push/follows', follows);
app.use('/notification/push/subcriber', subscriber);
app.use('/notification/push/likes', like);
const PORT = 5003;
app.listen(PORT, () => {
    console.log(`notification system now listening on port ${PORT}`)
});