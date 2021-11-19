const db = require('quick.db');

module.exports = {
    name: 'resetmuterole',
    async execute(client, message, args, Discord){
        const muteRole = await db.fetch(`muterole.${message.guild.id}`)

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("no DJ role is set in this server 🤨")
        )

        db.delete(`muterole.${message.guild.id}`)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("the mute role has been reset! 👍")
        )
    }
}