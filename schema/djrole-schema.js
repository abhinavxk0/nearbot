const mongoose = require('mongoose');

const djrole = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('djrole', djrole);
