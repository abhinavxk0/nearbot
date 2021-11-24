const config = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
    name: 'showerthought',
    aliases: ['st', 'shower'],
    async execute(client, message, args, Discord){
        const res = await fetch(`https://api.popcat.xyz/showerthoughts`)
        const json = await res.json()

        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(json.result)
                .setFooter(json.author)
        )
    }
}