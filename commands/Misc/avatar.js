module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp', 'pic'],
    execute(client, message, args, Discord){
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])|| message.author;
        let userAv = user.displayAvatarURL({
            dynamic: true,
            size: 1024,
            format: 'jpeg'
        })
        let png = user.displayAvatarURL({
            dynamic: true,
            size: 1024,
            format: 'png'
        })
        let jpg = user.displayAvatarURL({
            dynamic: true,
            size: 1024,
            format: 'jpg'
        })

        return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setImage(userAv)
                .setDescription(`[\`.PNG\`](${png}) - [\`.JPG\`](${jpg})`)
                .setAuthor(`${user.tag}'s avatar`)
        )
    }
}