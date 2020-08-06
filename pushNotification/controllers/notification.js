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
    try {
        const getNotifications = await Notification.find().where('recipientId').in(username)
        .sort({ date: -1 }).exec();
        emptyChecker(getNotifications);
        if(isEmpty === false){
            res.status(200).send(getNotifications)
        }else{
            res.status(200).send('You\'ve no notifications yet')
        }
    } catch (error) {
        throw error
    }
});

router.put('/read', async(req, res) => {
    try{
        const {
            notificationId,
            user
        } = req.body;
        const getNotification = await Notification.findById(notificationId)
        if(getNotification && getNotification.recipientId === user){
            console.log(getNotification);
            getNotification.read = true;
            getNotification.save().then(() => {
                console.log(getNotification);
                res.status(200).send('successfully read notification')
            })
            .catch((err) => res.status(500).send('something went wrong while trying to read data'));
        }
        if(!getNotification) return res.status(400).send('can\'t find this notification');
    }catch(err){
        throw err;
    }
})


module.exports = router;
