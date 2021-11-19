const db = require('quick.db');

module.exports = {
    name: 'setupmuteperms',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`u do not have the \`MANAGE_CHANNELS\` permission to use this command :/`)
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`i do not have the \`MANAGE_CHANNELS\` permission :c`)
        )

        const muteRole = await db.fetch(`muterole.${message.guild.id}`);
        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`set a mute role first to use this command `)
        )
        let msg = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('loading <a:loading:910721336542916660>')
        )

        message.guild.channels.cache.forEach( async (channel) => {
            await channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
              }).then(() =>
              msg.edit(
                  new Discord.MessageEmbed()
                  .setColor('#A9E9F6')
                  .setDescription('yay! i successfully set mute perms in every channel')
              )
            )
        })
    }
}