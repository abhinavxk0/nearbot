const Levels = require('discord-xp')
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'removelevel',
    async execute(client, message, args, Discord){
        const data = await schema.findOne({ Guild: message.guild.id });
        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Leveling system is **disabled**.")
        )
        const level = args[0].toString()
        let member;
        if (message.mentions.users.first()) {
            member = message.mentions.users.first();
        } else {
            member = message.author;
        }
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_ROLES\` permission to use this command.`)
        )
        if (!member){
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Please input a valid user.')
            )
        }
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Removed \`${level} levels\` from ${member}.`)
        ).then(
            Levels.subtractLevel(member.id, message.guild.id, level)
        )
    }
}