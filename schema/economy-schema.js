const mongoose = require('mongoose');

const economySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('economy', economySchema)