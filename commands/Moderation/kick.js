const { embedcolor, errorcolor, redtick, greentick } = require('../../config.json')

module.exports = {
    name: 'kick',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · You lack \`Kick Members\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · I lack \`Kick Members\` permission.`)
                .setTimestamp()
        )  

        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || 'No Reason'
        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor(errorcolor)
            .setDescription(`${redtick} · Enter a valid member to kick.`)
            .setTimestamp()
        )
        if (user == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${redtick} · You cannot kick yourself.`)
                .setTimestamp()
        )
        if (user == client.user.id) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor(errorcolor)
            .setDescription(`${redtick} · You cannot kick me, I'll get sad otherwise.`)
            .setTimestamp()
        )
        const cl = message.guild.member(client.user.id)
        if (user.roles.highest.position > cl.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor(errorcolor)
            .setDescription(`${redtick} · I am not higher than **${user.user.username}** to kick them.`)
            .setTimestamp()
        )
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor(errorcolor)
            .setDescription(`${redtick} · **${user.user.username}** has the same or higher role than you.`)
            .setTimestamp()
        )

        var target = message.guild.members.cache.get(user.id)

        try {
            target.kick({ reason })
            message.lineReply(
                new Discord.MessageEmbed()
                    .setDescription(`${greentick} · ${target} was kicked.\nReason: ${reason}`)
                    .setColor(embedcolor)
                    .setTimestamp()
            )
        } catch (err) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`${redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }



    }
}