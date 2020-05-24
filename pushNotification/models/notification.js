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
        type: Schema.Types.ObjectId,
        require
    },
    senderId:{
        type: Schema.Types.ObjectId,
        require
    },
    deleted: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('notification', notificationSchema);
