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

router.get('/all/messages', async(req, res) => {
    try {
        const username = req.header('username');
        const getNotifications = await Notification.find({'recipientId': username, type: {$eq: 'message'}, read: {$eq:false}})
        .sort({date: -1}).exec();
        if(emptyChecker(getNotifications)){
            return res.status(204).send('no notifications yet')
        }else{
            return res.status(200).send(getNotifications);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/all', async (req, res) => {
    const username = req.header('username');
    try {
        const getNotifications = await Notification.find({recipientId: username, type: {$ne: 'message'}})
        .sort({ date: -1 }).exec();
        if(emptyChecker(getNotifications)){
            return res.status(204).send('You\'ve no notifications yet')
        }
        return res.status(200).send(getNotifications)
    } catch (error) {
        return res.status(500).send(error);
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
            getNotification.read = true;
            getNotification.save().then(() => {
                res.status(200).send('successfully read notification')
            })
            .catch((err) => res.status(500).send('something went wrong while trying to read data'));
        }
        if(!getNotification) return res.status(400).send('can\'t find this notification');
    }catch(err){
        return res.status(200).send(err);
    }
});

router.put('/read/messages', async(req, res) => {
    try {
        const {
            recipient,
            sender
        } = req.body;
        const getNotification = await Notification.updateMany({
            $and: [
                {recipientId: {$eq: recipient}},
                {'senderId.username': {$eq: sender}},
                {type: {$eq: 'message'}},
                {read: {$eq:false}}
            ]
        }, {
            $set: {
                read: true
            }
        });
        return res.status(200).send('all messages are read');
    } catch (error) {
        return res.status(500).send(error);
    }
})


module.exports = router;
