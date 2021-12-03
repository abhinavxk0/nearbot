const config = require('../../config.json')

module.exports = {
    name: 'set-nick',
    aliases: ['nick', 'setnick', 'nickname'],
    async execute(client, message, args, Discord) {
        const member = message.mentions.members.first();
        let arguments = args[0];
        if (arguments.startsWith("<@")){
            arguments = args[1]
        }
        const cl = message.guild.member(client.user.id)

        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Nicknames\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Nicknames\` permission.`)
                .setTimestamp()
        )
        if (!member) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setTimestamp()
                .setDescription(`${config.redtick} · Please enter a valid member to set nickname.`)
        );
        if (!arguments) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setTimestamp()
                .setDescription(`${config.redtick} · Please enter a nickname to set.`)
        );
        if (member.roles.highest.position > cl.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I am not higher than **${member.user.username}** to set their nickname.`)
                .setTimestamp()
        )
        if (member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · **${member.user.username}** has the same or higher role than you.`)
                .setTimestamp()
        )

        try {
            const memberTarget = message.guild.members.cache.get(member.id)
            memberTarget.setNickname(arguments);
            message.react(config.greentick)
        } catch (err) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · There was an error! :/`)
            )
            throw err;
        }


    }
}


