const db = require('quick.db');

module.exports = {
    name: 'resetdjrole',
    async execute(client, message, args, Discord){
        const djRole = await db.fetch(`djrole.${message.guild.id}`)

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        if (djRole == null) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("no DJ role is set in this server 🤨")
        )

        db.delete(`djrole.${message.guild.id}`)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("the DJ role has been reset! 👍")
        )
    }
}