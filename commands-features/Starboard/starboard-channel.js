const db = require('quick.db');

module.exports = {
    name: 'starboard-channel',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )

        const channel = message.mentions.channels.first();
        if (!channel) {
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Please enter a valid channel.`)
        }
        db.set(`starboard_${message.guild.id}`, channel.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`The starboard channel has been set to ${channel}!`)
        )
    }
}