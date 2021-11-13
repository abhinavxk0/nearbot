const db = require('quick.db');

module.exports = {
    name: 'resetmuterole',
    async execute(client, message, args, Discord){
        const muteRole = await db.fetch(`muterole.${message.guild.id}`)

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("There is no mute role set in this server.")
        )

        db.delete(`muterole.${message.guild.id}`)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("The mute role has been reset.")
        )
    }
}