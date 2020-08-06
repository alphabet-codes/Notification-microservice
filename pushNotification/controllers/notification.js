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
        if(!getNotification) return res.status(400).send('can\'t find this notification');
        if(getNotification && getNotification.reciepientId.username === user){
            getNotification.read = true;
            await getNotification.save();
            return res.status(200).send('successfully read notification');
        }
    }catch(err){
        throw err;
    }
})


module.exports = router;
