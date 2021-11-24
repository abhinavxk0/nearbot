const config = require('../../config.json')

module.exports = {
    name: 'unlock',
    aliases: ['ul'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )
        
        const channel = message.mentions.channels.first() || message.channel;

        try {
            await channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: null,
              })
              message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} · ${channel} has been unlocked.`)
                    .setTimestamp()
            )
        } catch (e){
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}