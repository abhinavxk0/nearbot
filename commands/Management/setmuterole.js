const db = require('quick.db');

module.exports = {
    name: 'setmuterole',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        const muteRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!muteRole) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`mention a role so i can set the mute role pls 🙏`)            
        )

        db.set(`muterole.${message.guild.id}`, muteRole.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`i set the mute role to <@&${muteRole.id}> yay `)
        )

    }
}