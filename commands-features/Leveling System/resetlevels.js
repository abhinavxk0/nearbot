const Levels = require('discord-xp')
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'resetlevels',
    async execute(client, message, args, Discord){
        const data = await schema.findOne({ Guild: message.guild.id });
        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Leveling system is **disabled**.")
        );
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )
        Levels.deleteGuild(message.guild.id).then(
            message.reply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`I reset @everyone's levels.`)
            )
        )
        
    }
}