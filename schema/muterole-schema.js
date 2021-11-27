const mongoose = require('mongoose');

const muterole = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('muterole', muterole);
