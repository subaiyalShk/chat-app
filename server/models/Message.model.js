const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message:{
        type: String,
        required: [
            true,
            "Message cant be empty"
        ]
    },
}, {timestamps:true})


module.exports.Message = mongoose.model('Message', MessageSchema);

