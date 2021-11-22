const mongoose = require('mongoose')

const cooldownSchema = mongoose.Schema({
    userId: String,
    cmd: String,
    time: Number,
    cooldown: Number
})

module.exports = mongoose.model('cooldown', cooldownSchema)