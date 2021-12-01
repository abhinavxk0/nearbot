const config = require('../../config.json')

module.exports = {
    name: 'invite',
    aliases: ['inv'],
    async execute(client, message, args, Discord){
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(`[\`Invite Nearbot\`](https://discord.com/api/oauth2/authorize?client_id=822424076491554827&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2F3h5ajxffkw&response_type=code&scope=guilds.join%20bot)`)
        )
    }
}