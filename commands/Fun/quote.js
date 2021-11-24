const config = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
    name: 'quote',
    async execute(client, message, args, Discord){
        const res = await fetch(`https://api.popcat.xyz/quote`)
        const json = await res.json()

        message.lineReply(`${json.quote}`)
    }
}