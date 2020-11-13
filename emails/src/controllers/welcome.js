const express = require('express')
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/welcome', (req, res) => {
    const {
        recipient,
    } = req.body;
    const apiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(apiKey);
    const msg = {
      to: recipient,
      from: 'devlopergene@gmail.com',
      templateId: 'd-f9f7ad43cf6641bb818a5122c9173f46',
      dynamic_template_data: {
        subject: 'welcome to seamsville',
      },
    };
    sgMail.send(msg)
    .then(() => {
       res.status(202).send('successfully sent email')
    })
    .catch((error) => {
        throw error
    })
});

module.exports = router;