const config = require('../../config.json');
const Schema = require('../../schema/muterole-schema');

module.exports = {
    name: 'resetmuterole',
    async execute(client, message, args, Discord){

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setTimestamp()
                .setDescription(`${config.redtick} · You lack \`Administrator\` permission!`)
        )

        const data = await Schema.findOne({
            guildId: message.guild.id
        })
        if (!data){
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription("There is no mute role set!")
                    .setTimestamp()
            )
        }
        await Schema.findOneAndDelete({
            guildId: message.guild.id
        });
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(`${config.greentick} ·  I reset the mute role.`)
                .setTimestamp()
        )
    }
}