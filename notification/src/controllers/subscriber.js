const express = require('express');
const Notification = require ('../models/notification');
const NotificationType = require('../models/notificationType');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
    const {
        recipientId,
        senderId,
        message
    } = req.body;
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'subscribe'});
        if(getType){
            const newNotification = new Notification({
                type: getType.name,
                recipientId,
                senderId,
                message
            });
            newNotification.save();
            res.status(200).send('notification sent');
        }else{
            const newNotificationType = new NotificationType({
                name: 'subscribe',
                description: 'notification for anything related to subscribing'
            });
            newNotificationType.save()
            .then((response) => {
                const newNotification = new Notification({
                    type: response.name,
                    recipientId,
                    senderId,
                    message
                });
                newNotification.save();
                res.status(200).send('notification sent');
            }).catch((error)=> {
                throw error;
            })
        }
    } catch (error) {
        throw error 
    }
});

router.post('/notify-collection', async (req, res) => {
    const {
        recipientIds,
        senderId,
        message
    } = req.body;
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'collection'});
        if(getType){
            recipientIds.forEach(recipient => {
                const newNotification = new Notification({
                    type: getType.name,
                    recipientId: recipient,
                    senderId,
                    message
                });
                newNotification.save();
                return res.status(200).send('notification sent');                
            });
        }else{
            const newNotificationType = new NotificationType({
                name: 'collection',
                description: 'notification for anything related to collection'
            });
            newNotificationType.save()
            .then((response) => {
                recipientIds.forEach(recipient => {
                    const newNotification = new Notification({
                        type: response.name,
                        recipientId: recipient,
                        senderId,
                        message
                    });
                    newNotification.save();
                    return res.status(200).send('notification sent');                
                });
            }).catch((error)=> {
                throw error;
            })
        }
    } catch (error) {
        throw error 
    }
});


module.exports = router;