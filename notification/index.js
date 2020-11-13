const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const follows = require('./src/controllers/follow');
const notification = require('./src/controllers/notification');
const subscriber = require('./src/controllers/subscriber');
const like = require('./src/controllers/like');
const review = require('./src/controllers/review');
const post = require('./src/controllers/post');
const comment = require('./src/controllers/comment');
const reply = require('./src/controllers/reply');
const message = require('./src/controllers/message');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/seamsville', ({useNewUrlParser: true}))
.then(() => {
    console.log('App now listening to db')
}).catch((error) => {
    throw error
});
app.use('/api/v1/notification/push', notification);
app.use('/api/v1/notification/push/follows', follows);
app.use('/api/v1/notification/push/subcriber', subscriber);
app.use('/api/v1/notification/push/likes', like);
app.use('/api/v1/notification/push/reviews', review);
app.use('/api/v1/notification/push/posts', post);
app.use('/api/v1/notification/push/comments', comment);
app.use('/api/v1/notification/push/replies', reply);
app.use('/api/v1/notification/push/message', message);
app.get('/api/v1/notification', (req, res) => {
    return res.send('Hello services')
});

const PORT = 5003;
app.listen(PORT, () => {
    console.log(`notification system now listening on port ${PORT}`)
});