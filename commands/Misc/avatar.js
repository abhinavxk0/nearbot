module.exports = {
    name: 'avatar',
    execute(client, message, args, Discord){
        let user = message.author || message.mentions.first() || message.guild.members.cache.get(args[0]);
        let userAv = user.displayAvatarURL({
            dynamic: true
        })

        return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setImage(userAv)
                .setAuthor(`${user.username}'s Avatar`)
        )
    }
}