const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationTypeSchema = new Schema({
    name: {
        type: String,
        require,
    },
    description: {
        type: String,
        require
    },
})

module.exports = mongoose.model('notificationType', notificationTypeSchema);
