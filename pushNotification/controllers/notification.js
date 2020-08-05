const express = require('express');
const Notification = require ('../models/notification');
const router = express.Router();

// Empty checker
let isEmpty = true;
const emptyChecker = (obj) => {
    for(var key in obj){
        if(obj.hasOwnProperty(key)) isEmpty = false;

    }
    return isEmpty
}

router.post('/all', async (req, res) => {
    const username = req.body.username;
    console.log(req.body);
    try {
        const getNotifications = await Notification.find().where('recipientId').in(username)
        .sort({ date: -1 }).exec();
        emptyChecker(getNotifications);
        console.log(username);
        if(isEmpty === false){
            res.status(200).send(getNotifications)
        }else{
            res.status(200).send('You\'ve no notifications yet')
        }
    } catch (error) {
        throw error
    }
});


module.exports = router;
