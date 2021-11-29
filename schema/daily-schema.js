const mongoose = require('mongoose')

const dailySchema = mongoose.Schema({
    userId: {
      type : String,
      required: true  
    },
    lastUsed: {
        type: Date,
        default: null,
        required: true,
    }
})

module.exports = mongoose.model('daily', dailySchema)