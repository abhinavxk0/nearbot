const db = require('quick.db');

module.exports = {
    name: 'setupmuteperms',
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

        const muteRole = await db.fetch(`muterole.${message.guild.id}`);
        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`There is no mute role set for this server.`)
        )
        let msg = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Loading...')
        )

        message.guild.channels.cache.forEach( async (channel) => {
            await channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
              }).then(() =>
              msg.edit(
                  new Discord.MessageEmbed()
                  .setColor('#A9E9F6')
                  .setDescription('**Successfully** setup mute permissions in all channels.')
              )
            )
        })
    }
}