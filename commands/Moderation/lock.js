const { embedcolor, errorcolor, redtick, greentick } = require('../../config.json')

module.exports = {
    name: 'lock',
    aliases: ['l'],
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · You lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · I lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )

        const channel = message.mentions.channels.first() || message.guild.channels.cache.filter(ch => ch.type === 'text').find(ch => ch.name === args[1]) || message.guild.channels.cache.filter(ch => ch.type === 'voice').find(ch => ch.name === args[1]) || message.channel;
        if (!channel) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`${redtick} · Enter a valid channel to lock.`)
                .setTimestamp()
        )
        try {
            await channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: false,
            })
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`${greentick} · ${channel} has been locked.`)
                    .setTimestamp()
            )
        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`${redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}