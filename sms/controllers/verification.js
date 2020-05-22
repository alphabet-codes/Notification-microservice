const express = require('express');
const router = express.Router();

router.get('/sendPhoneVerificationCode', async (req, res) => {
    res.send('Hello world')
})

export default router