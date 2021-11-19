const db = require('quick.db');

module.exports = {
    name: 'setdjrole',
    async execute(client, message, args, Discord){
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        const djRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!djRole) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`you need to mention a role to set a DJ role right?`)            
        )

        db.set(`djrole.${message.guild.id}`, djRole.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`i set the DJ role to <@&${djRole.id}> 👍`)
        )

    }
}