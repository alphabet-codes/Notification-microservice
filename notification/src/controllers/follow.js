const express = require('express');
const Notification = require ('../models/notification');
const NotificationType = require('../models/notificationType');
const router = express.Router();

router.post('/follow', async (req, res) => {
    const {
        recipientId,
        senderId,
        message
    } = req.body;
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'follow'});
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
                name: 'follow',
                description: 'notification for anything related to follows'
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
                return res.status(200).send('notification sent');
            }).catch((error)=> {
                return res.status(500).send(error);
            })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/notify-followers/collections', async (req, res) => {
    const {
        recipientIds,
        senderId,
        message,
        contentId
    } = req.body;
    console.log(recipientIds);
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'collection'});
        if(getType){
            recipientIds.forEach(recipient => {
                const newNotification = new Notification({
                    type: getType.name,
                    recipientId: recipient.username,
                    senderId,
                    message,
                    contentId
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
                        message,
                        contentId
                    });
                    newNotification.save();
                    return res.status(200).send('notification sent');                
                });
            }).catch((error)=> {
                throw error;
            })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;