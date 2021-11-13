const mongoose = require('mongoose');

const AFKSchema = mongoose.Schema({
    userID : {
        type: String,
        required: true
    },
    time : {
        type: Date,
        default: null,
    },
    guildID : {
        type: String,
        required: true
    },
    AFK : {
        type: Boolean,
        default: false
    },
    AFK_Reason : {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("afk", AFKSchema)