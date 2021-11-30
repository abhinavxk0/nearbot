const mongoose = require('mongoose');

const played = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    playNum: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('playedtimes', played);
