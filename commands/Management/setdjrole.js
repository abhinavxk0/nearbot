const db = require('quick.db');

module.exports = {
    name: 'setdjrole',
    async execute(client, message, args, Discord){
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        const djRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!djRole) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Please mention a role to set as DJ role for this server.`)            
        )

        db.set(`djrole.${message.guild.id}`, djRole.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`The mute role for this server has been set to <@&${djRole.id}>`)
        )

    }
}