const express = require('express')
const router = express.Router();

router.post('/reset', (req, res) => {
    res.send('Hello')
});

module.export = router;