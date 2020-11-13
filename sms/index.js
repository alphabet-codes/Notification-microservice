const express = require('express');
const bodyParser = require('body-parser');
const phoneVerify = require ('./src/controllers/verification');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/notification/sms/verify', phoneVerify);
app.get('/api/v1/notification/sms', (req, res) => {
    return res.send('Welcome to the sms notification endpoint')
});
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Sms system now listening on port ${PORT}`)
});