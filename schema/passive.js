const mongoose = require('mongoose');

const pass = mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Passive Schema', pass);
