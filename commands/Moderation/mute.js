const config = require('../../config.json')
const db = require('quick.db')
const ms = require('ms')
const pretty = require('pretty-ms')

module.exports = {
    name: 'mute',
    aliases: ['m'],
    async execute(client, message, args, Discord) {
        var muteRole = await db.fetch(`muterole.${message.guild.id}`);
        var muteTarget = message.mentions.members.first();
        var time = args[1];
        let memberRole = message.member.roles.highest.position;
        let targetRole = muteTarget.roles.highest.position;
        let prettyTime;
        if (time) {
            prettyTime = ` for ${pretty(ms(time))}.`
        } else {
            prettyTime = '.';
        }
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Roles\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Roles\` permission.`)
                .setTimestamp()
        )
        if (muteRole == null) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · No mute role is set for this server. Use \`setmuterole\` to set it!`)
            );
        }
        if (muteTarget.user.id == message.author.id) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · You can't mute yourself.`)
            );
        }
        if (!muteTarget) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · Enter a valid user to mute.`)
            )
        }
        if (muteTarget.roles.cache.has(muteRole)) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · **${muteTarget.user.username}** is already muted.`)
            )
        }
        const cl = message.guild.member(client.user.id)
        if (muteTarget.roles.highest.position > cl.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${config.redtick} · I am not higher than **${user.user.username}** to mute them.`)
                .setTimestamp()
        )
        if (targetRole >= memberRole) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · **${user.user.username}** has the same or higher role than you.`)
            )
        }

        try {
            await muteTarget.roles.add(muteRole)
                .then(
                    message.lineReply(
                        new Discord.MessageEmbed()
                            .setColor(config.embedcolor)
                            .setDescription(`${config.greentick} · **${muteTarget.user.tag}** has been muted${prettyTime}`)
                            .setTimestamp()
                    )
                )

        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`${redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
        if (time) {
            setTimeout(() => {
                if (!muteTarget.roles.cache.has(muteRole)) return;
                muteTarget.roles.remove(muteRole)
                try {
                    muteTarget.send(
                        new Discord.MessageEmbed()
                            .setColor(config.embedcolor)
                            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                            .setDescription(`You have been unmuted!`)
                            .setTimestamp()
                    )
                } catch (err) {
                    throw err;
                }
            }, ms(time))
        } else return;

    }
}