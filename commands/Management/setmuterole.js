const db = require('quick.db');

module.exports = {
    name: 'setmuterole',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        const muteRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!muteRole) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Please mention a role to set as mute role for this server.`)            
        )

        db.set(`muterole.${message.guild.id}`, muteRole.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`The mute role for this server has been set to <@&${muteRole.id}>`)
        )

    }
}