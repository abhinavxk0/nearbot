const mongoose = require('mongoose');

const togglelvlSchema = mongoose.Schema({
    Guild: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('toggle-lvl', togglelvlSchema);
