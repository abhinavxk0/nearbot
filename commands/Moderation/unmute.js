const db = require('quick.db');
const config = require('../../config.json')
const schema = require('../../schema/muterole-schema');

module.exports = {
    name: 'unmute',
    aliases: ['um'],
    async execute(client, message, args, Discord){
        const skema = await schema.findOne({
            guildId: message.guild.id
        })
        const muteRole = message.guild.roles.cache.get(skema.roleId)
        const user = message.mentions.members.first()
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Roles\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Roles\` permission.`)
                .setTimestamp()
        )

        
        if (!skema) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · No mute role is set for this server. Use \`setmuterole\` to set it!`)
            );
        }
        
        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setTimestamp()
                .setDescription(`${config.redtick} · Enter a valid user to mute.`)
        )
        if (user.id == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setTimestamp()
                .setDescription(`${config.redtick} · You can't mute yourself.`)
        );
        const cl = message.guild.member(client.user.id)
        if (user.roles.highest.position > cl.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I am not higher than **${user.user.username}** to mute them.`)
                .setTimestamp()
        )
        if (user.roles.highest.position >= message.member.roles.highest.position) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setTimestamp()
                    .setDescription(`${config.redtick} · **${user.user.username}** has the same or higher role than you.`)
            )
        }

        try {
            if (user.roles.cache.has(muteRole)){
                user.roles.remove(muteRole).then(
                    message.lineReply(
                        new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} · **${user.user.username}** has been unmuted.`)
                    )
                )
            }
        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}