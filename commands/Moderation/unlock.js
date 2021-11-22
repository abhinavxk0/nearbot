module.exports = {
    name: 'unlock',
    aliases: ['ul'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`MANAGE_CHANNELS\` permission.`)
        )
        
        const channel = message.mentions.channels.first() || message.channel;

        try {
            await channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: null,
              })
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`${channel} has been unlocked.`)
                    .setFooter(`Unlocked by ${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            )
        } catch (e){
            console.log(e)
        }
    }
}