const express = require('express')
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/reset', (req, res) => {
    res.send('Hello')
});

module.exports = router;