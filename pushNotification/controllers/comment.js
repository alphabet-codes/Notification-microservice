const express = require('express');
const Notification = require ('../models/notification');
const NotificationType = require('../models/notificationType');
const router = express.Router();

router.post('/comment', async (req, res) => {
    const {
        recipientId,
        senderId,
        message,
        contentId
    } = req.body;
    try {
        // Check notification type
        const getType = await NotificationType.findOne({name: 'comment'});
        if(getType){
            const newNotification = new Notification({
                type: getType.name,
                recipientId,
                senderId,
                message,
                contentId
            });
            newNotification.save()
            .then((data) => {
                console.log(data);
                return res.status(200).send('notification sent');
            }).catch((err) => {
                return res.status(500).send(err.message);
            });
        }else{
            const newNotificationType = new NotificationType({
                name: 'comment',
                description: 'notification for anything related to posts'
            });
            newNotificationType.save()
            .then((response) => {
                const newNotification = new Notification({
                    type: response.name,
                    recipientId,
                    senderId,
                    message,
                    contentId
                });
                newNotification.save();
                return res.status(200).send('notification sent');
            }).catch((error)=>  res.status(500).send(error.message))
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
});

module.exports = router;
