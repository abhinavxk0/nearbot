const ms = require('ms')
const config = require('../../config.json')

module.exports = {
    name: 'slowmode',
    aliases: ['sm', 'slow'],
    async execute(client, message, args, Discord) {
        const rawchnl = message.mentions.channels.first() || message.channel;
        const chnl = await client.channels.cache.get(rawchnl.id)

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Channels\` permission.`)
                .setTimestamp()
        )

        if (!args[0]) {
            try {
                chnl.setRateLimitPerUser(0)
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} · Slowmode for ${chnl} has been reset.`)
                        .setTimestamp()
                )
            } catch (error) {
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.errorcolor)
                        .setDescription(`${config.redtick} · There was an error! :/`)
                        .setTimestamp()
                )
            }
            return 
        }
        const raw = args[1];
        const milliseconds = ms(raw);

        if (isNaN(milliseconds)) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · Slowmode duration entered was invalid.`)
            )
            return;
        }

        if (milliseconds < 1000) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · The minimum slowmode is 1 second.`)
            )
            return;
        }

        try {
            chnl.setRateLimitPerUser(milliseconds / 1000)
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} · Slowmode for ${chnl} has been set to ${ms(milliseconds, {
                        long: true
                    })}.`)
                    .setTimestamp()
            )
        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}