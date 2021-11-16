const db = require('quick.db');

module.exports = {
    name: 'resetdjrole',
    async execute(client, message, args, Discord){
        const djRole = await db.fetch(`djrole.${message.guild.id}`)

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        if (djRole == null) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("There is no mute role set in this server.")
        )

        db.delete(`djrole.${message.guild.id}`)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("The mute role has been reset.")
        )
    }
}