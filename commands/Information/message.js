const config = require('../../config.json')
const moment = require('moment')

module.exports = {
    name: 'message',
    aliases: ['msg', 'dev'],
    async execute(client, message, args, Discord){
        const channel = client.channels.cache.get("913293010454855710")
        const lastmsg = channel.messages.fetch( { limit : 1}).then(
            messages => {
                let lastMessage = messages.first()
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${lastMessage.content}\n\n⬆️  Last message from [developer](https://discords.com/bio/p/xaviervv).`)
                    .setFooter(`${lastMessage.author.username} | ${moment(lastMessage.createdTimestamp).fromNow()}`, lastMessage.author.displayAvatarURL({dynamic: true}))
                message.lineReply(embed)
            }
        ).catch(console.error)


    }
}