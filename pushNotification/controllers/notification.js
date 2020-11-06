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
        const getNotifications = await Notification.find({'reciepientId': username, 'type': {$eq: 'message'}, 'read': {$eq:'false'}})
        .sort({date: -1}).exec();
        if(emptyChecker(getNotifications)){
            return res.status(204).send('no notifications yet')
        }else{
            console.log(getNotifications);
            return res.status(200).send(getNotifications);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/all', async (req, res) => {
    const username = req.header('username');
    try {
        const getNotifications = await Notification.find({'recipientId': username, 'type': {$ne: 'message'}})
        .sort({ date: -1 }).exec();
        emptyChecker(getNotifications);
        console.log(getNotifications);
        if(isEmpty === false){
            res.status(200).send(getNotifications)
        }else{
            res.status(204).send('You\'ve no notifications yet')
        }
    } catch (error) {
        res.status(500).send(error);
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
})


module.exports = router;
