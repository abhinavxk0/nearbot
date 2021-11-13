const { embedcolor } = require('../../config.json')
module.exports = {
    name: 'ban',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`BAN_MEMBERS\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`BAN_MEMBERS\` permission.`)
        )   

        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var reason = args.slice(1).join(" ") || 'No reason.';

        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Enter a valid member to ban.`)
        )
        if (user == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You cannot ban yourself.`)
        )
        if (user == client.user.id) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Please don't ban me.`)
        )
        if (!user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('you cannot mute this member as they are the same role as you or higher')


        var targetID = message.guild.members.cache.get(user.id);
        targetID.ban({
            reason
        })
        message.lineReply(
            new Discord.MessageEmbed()
                .setAuthor(`Banned by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic : true}))
                .setDescription(`${targetID} was banned.`)
                .setColor(embedcolor)
                .setTimestamp()
        )


        





    }
}