const db = require('quick.db');

module.exports = {
    name: 'resetannounce',
    async execute(client, message, args, Discord) {
        const data = await db.fetch(`announce.${message.guild.id}`)

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        if (data == null) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`There is no level-up announcement channel set in this server.`)
        )

        db.delete(`announce.${message.guild.id}`)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("The level-up announcement channel has been reset.")
        )
    }
}