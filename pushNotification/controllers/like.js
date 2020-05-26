const express = require('express');
const Notification = require ('../models/notification');
const NotificationType = require('../models/notificationType');
const router = express.Router();

router.post('/like', async (req, res) => {
    const {
        recipientId,
        senderId,
        message
    } = req.body;
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'like'});
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
                name: 'like',
                description: 'notification for anything related to likes'
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

module.exports = router;