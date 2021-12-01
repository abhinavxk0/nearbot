const db = require('quick.db');
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'setannounce',
    async execute(client, message, args, Discord) {
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


        const channel = message.mentions.channels.first();
        if (!channel) {
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Please enter a valid channel.`)
        }
        db.set(`announce.${message.guild.id}`, channel.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`The level-up announcement channel has been set to ${channel}!`)
        )
    }
}