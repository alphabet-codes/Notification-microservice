const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const app = express();

const PORT = 5002
app.listen(PORT, () => {
    console.log(`Sms system now listening on port ${PORT}`)
});