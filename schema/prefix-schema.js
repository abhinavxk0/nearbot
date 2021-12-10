const mongoose = require('mongoose')

const prefixSchema = mongoose.Schema({
   guild: {
       type: String,
       required: true
   },  
   prefix: {
       type: String, 
       required: true,
       default: 'n!'
   },

})

module.exports = mongoose.model('guild-prefixes', prefixSchema)