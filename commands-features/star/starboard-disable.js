const db = require('quick.db');

module.exports = {
    name: 'starboard-disable',
    async execute(client, message, args, Discord){

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )
            if(!db.has(`starboard_${message.guild.id}`)){
                return message.channel.send(`${message.guild.name} hasn't setup starboard yet :star:`);
            }
            db.delete(`starboard_${message.guild.id}`)
            return message.lineReplyNoMention(`Removed :star: Star board`)

    }
}