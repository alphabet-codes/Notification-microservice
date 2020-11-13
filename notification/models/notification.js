const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationSchema = new Schema({
    type: {
        type: String,
        require
    },
    date: {
        type: Date,
        default: Date.now
    },
    message:{
        type: String,
        require
    },
    read: {
        type: Boolean,
        default: false
    },
    recipientId:{
        type: String,
        require
    },
    contentId:{
        type: String,
        require
    },
    senderId:{
        type: Object,
        require
    },
    deleted: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('notification', notificationSchema);
