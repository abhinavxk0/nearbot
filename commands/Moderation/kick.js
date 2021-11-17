const { embedcolor } = require('../../config.json')
module.exports = {
    name: 'kick',
    async execute(client, message, args, Discord){
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var reason = args.join(" ") || 'No Reason'
        if (!user){
            message.lineReply(
                new Discord.MessageEmbed()  
                    .setColor(embedcolor)
                    .setDescription(`Please enter a valid user.`)
            )
            return
        }
        if (user == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You cannot kick yourself.`)
        )
        if (user == client.user.id) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Please don't kick me.`)
        )
        if (!user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('you cannot mute this member as they are the same role as you or higher')

        var target = message.guild.members.cache.get(user.id)
        target.kick({ reason })
        message.lineReply(
            new Discord.MessageEmbed()
                .setAuthor(`Kicked by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic : true}))
                .setDescription(`${target} was kicked.`)
                .setColor(embedcolor)
                .setTimestamp()
        )
    }
}