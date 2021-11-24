const { embedcolor, errorcolor, redtick, greentick } = require('../../config.json')

module.exports = {
    name: 'drag',
    aliases: ['pull', 'dr'],
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · You lack \`Move Members\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · I lack \`Move Members\` permission.`)
                .setTimestamp()
        )
        const target = message.mentions.members.first();
        const channel = message.mentions.channels.first() || message.guild.channels.cache.filter(ch => ch.type === 'voice').find(ch => ch.name === args[1]) || message.member.voice.channel;
        if (!target) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · Enter a valid user to drag.`)
                .setTimestamp()
        )
        if (!target.voice.channel) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · **${target.user.username}** is not in a voice channel.`)
                .setTimestamp()
        )
        if (!message.member.voice.channel) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · You are not in a voice channel.`)
                .setTimestamp()
        )

        try {
            target.voice.setChannel(channel)
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`${greentick} · Dragged **${target.user.username}** to ${channel}`)
                    .setTimestamp()
            )

        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`${redtick} · There was an error. :/`)
                    .setTimestamp()
            )
            throw err;
        }
    }
}