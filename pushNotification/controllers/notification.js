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
    const id = req.body.id;
    try {
        const getNotifications = await Notification.find().where('recipientId').in(id).exec();
        emptyChecker(getNotifications);
        console.log(id);
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
