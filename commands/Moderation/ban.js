const config = require('../../config.json')

module.exports = {
    name: 'ban',
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Ban Members\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Ban Members\` permission.`)
                .setTimestamp()
        )

        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || 'No reason.';

        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · Please enter a valid member to ban.`)
                .setTimestamp()
        )
        if (user == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You cannot ban yourself.`)
                .setTimestamp()
        )
        if (user == client.user.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You cannot ban me, I'll get sad otherwise.`)
                .setTimestamp()
        )
        const cl = message.guild.member(client.user.id)
        if (user.roles.highest.position > cl.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I am not higher than **${user.user.username}** to ban them.`)
                .setTimestamp()
        )
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · **${user.user.username}** has the same or higher role than you.`)
                .setTimestamp()
        )


        var targetID = message.guild.members.cache.get(user.id);
        try {
            targetID.ban({
                reason
            })
            message.lineReply(
                new Discord.MessageEmbed()
                    // .setAuthor(`Banned by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`${config.greentick} · ${targetID} was banned.\nReason: ${reason}`)
                    .setColor(config.embedcolor)
                    .setTimestamp()
            )
        } catch (err) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}