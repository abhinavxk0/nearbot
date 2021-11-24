const config = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
    name: 'showerthought',
    async execute(client, message, args, Discord){
        const res = await fetch(`https://api.popcat.xyz/showerthoughts`)
        const json = await res.json()

        message.lineReply(`${json.result}\n- ${json.author}`)
    }
}