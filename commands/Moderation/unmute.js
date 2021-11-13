const db = require('quick.db');

module.exports = {
    name: 'unmute',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_ROLES\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`MANAGE_ROLES\` permission.`)
        )

        const muteRole = await db.fetch(`muterole.${message.guild.id}`);
        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`There is no mute role set for this server.`)
        )

        const user = message.mentions.members.first()
        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Enter a user to mute.`)
        )
        if (user.id == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You cannot mute yourself.`)
        )

        if (user.roles.cache.has(muteRole)){
            user.roles.remove(muteRole).then(
                message.lineReply(
                    new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`${user} has been unmuted.`)
                )
            )
        }
    }
}