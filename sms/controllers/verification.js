const express = require('express');
const twilio = require('twilio');
const router = express.Router();
require('dotenv').config();

// Random nuber for verification generator
const randomNumber = Math.floor(100000 + Math.random() * 900000);
// Twilio token
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

router.post('/send-phone-verification-code', async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        await client.messages.create({
            body: randomNumber,
            from: +12513027428,
            to: phoneNumber,
          }).then((message) => {
            const messageBody = message.body;
            const code = messageBody.match(/\d+/g);
            const verificationCode = code.toString();
            res.status(200).send(verificationCode);
          });
    } catch (error) {
        throw error        
    }
});

router.post('/delete-account', async (req, res) => {
    try {
        const message = req.body.message
        const phoneNumber = req.body.phoneNumber;
        await client.messages.create({
            body: message,
            from: +12513027428,
            to: phoneNumber,
          }).then((message) => {
            const messageBody = message.body;
            res.status(200).send(messageBody);
          });
    } catch (error) {
        throw error        
    }
});

router.post('/verify-phone', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    try {
        client.messages.create({
            body: `Your phone ${phoneNumber} has been verified by the seamsville team. Thank you for choosing seamsville`,
            from: +12513027428,
            to: phoneNumber,
          }).then((message) => {
              res.status(200).send('Successfully verified phone');
          })
          .catch((error) => {
            throw error;
          });
    } catch (error) {
        throw error
    }
})

module.exports = router;