const express = require('express')
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/reset-password', (req, res) => {
    const {
        recipient,
        username,
        resetToken
    } = req.body;
    const apiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(apiKey);
    const msg = {
      to: recipient,
      from: 'devlopergene@gmail.com',
      templateId: 'd-cc86cebf5b074a9d9b2c9f1eea26e5ae',
      dynamic_template_data: {
        subject: 'seamsville password reset',
        unique_name:username,
        token_url: `https://www.seamsville.com/forgot-password?token=${resetToken}`,
      },
    };
    sgMail.send(msg)
    .then(() => {
       return res.status(202).send(resetToken)
    })
    .catch((error) => {
      return res.status(500).send(error);
    })
});


router.post('/reset-successful', (req, res) => {
    const {
        recipient,
        username,
    } = req.body;
    const apiKey = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(apiKey);
    const msg = {
      to: recipient,
      from: 'devlopergene@gmail.com',
      templateId: 'd-89ef5130b7854e0194ee10e5965c6b57',
      dynamic_template_data: {
        subject: 'password reset successful',
        unique_name:username,
      },
    };
    sgMail.send(msg)
    .then(() => {
       return res.status(202).send('successfully sent email')
    })
    .catch((error) => {
        return res.status(500).send(error);
    })
});

module.exports = router;