const { embedcolor, errorcolor } = require('../../config.json')
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

        if (muteRole == null) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setDescription('No mute role is set for this server. Use \`muterole\` to set it!')
            );
        }
        if (!muteTarget) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setDescription('You need to mention who you want to mute!')
            )
        }
        if (muteTarget.roles.cache.has(muteRole)) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setDescription(`\`${muteTarget.user.tag}\` is already muted.`)
            )
        }
        if (targetRole >= memberRole) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setDescription(`\`${muteTarget.user.tag}\` has a higher or the same top role as you!`)
            )
        }

        await muteTarget.roles.add(muteRole)
            .then(
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(embedcolor)
                        .setDescription(`\`${muteTarget.user.tag}\` has been muted${prettyTime}`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                )
            )
        if (time) {
            setTimeout(() => {
                if (!muteTarget.roles.cache.has(muteRole)) return;
                muteTarget.roles.remove(muteRole)
                try {
                    muteTarget.send(
                        new Discord.MessageEmbed()
                            .setColor(embedcolor)
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