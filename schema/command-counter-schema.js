const mongoose = require('mongoose');

const command = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    countNum: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('commandcounter', command);
