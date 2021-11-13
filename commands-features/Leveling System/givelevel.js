const Levels = require('discord-xp')
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'givelevel',
    async execute(client, message, args, Discord){
        const level = args[0].toString()
        let member;
        if (message.mentions.users.first()) {
            member = message.mentions.users.first();
        } else {
            member = message.author;
        }
        const data = await schema.findOne({ Guild: message.guild.id });
        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Leveling system is **disabled**.")
        );
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
                .setDescription(`Added \`${level} levels\` to ${member}.`)
        ).then(
            Levels.appendLevel(member.id, message.guild.id, level)
        )
    }
}