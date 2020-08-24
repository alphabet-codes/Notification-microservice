const express = require('express');
const Notification = require ('../models/notification');
const NotificationType = require('../models/notificationType');
const router = express.Router();

router.post('/like', async (req, res) => {
    const {
        recipientId,
        senderId,
        message,
        contentId
    } = req.body;
    console.log(contentId)
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'like'});
        if(getType){
            const newNotification = new Notification({
                type: getType.name,
                recipientId,
                senderId,
                message,
                contentId
            });
            await newNotification.save();
            return res.status(200).send('notification sent');
        }else{
            const newNotificationType = new NotificationType({
                name: 'like',
                description: 'notification for anything related to likes'
            });
            newNotificationType.save()
            .then(async(response) => {
                const newNotification = new Notification({
                    type: response.name,
                    recipientId,
                    senderId,
                    message,
                    contentId
                });
                await newNotification.save();
                return res.status(200).send('notification sent');
            }).catch((error)=> {
                return res.status(500).send(error.message)
            })
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;