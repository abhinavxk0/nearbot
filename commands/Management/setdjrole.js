const db = require('quick.db');
const config = require("../../config.json")
module.exports = {
    name: 'setdjrole',
    async execute(client, message, args, Discord){
        const queue = await client.distube.getQueue(message);

        if (queue.playing) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`You cannot set the DJ role when music is playing.`)
                .setFooter('as it might cause major issues.')
        )
        
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