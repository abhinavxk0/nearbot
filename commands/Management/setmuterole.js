const Schema = require('../../schema/muterole-schema');
const config = require('../../config.json');

module.exports = {
    name: 'setmuterole',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`${config.redtick} · You lack \`Administrator\` permission!`)
        )

        const muteRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!muteRole) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`${config.redtick} · Mention or enter mute role ID.`)            
        )

        const data = await Schema.findOne({
            guildId: message.guild.id
        });

        if (data){
            await Schema.findOneAndRemove({
                guildId: message.guild.id
            });
            let newData = new Schema({
                guildId: message.guild.id,
                roleId: muteRole.id
            })
            await newData.save();
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} · I set the mute role to ${muteRole}.`)
                    .setTimestamp()
            )
        } else if (!data){
            let newData = new Schema({
                guildId: message.guild.id,
                roleId: muteRole.id
            })
            await newData.save();
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} · I set the mute role to ${muteRole}.`)
                    .setTimestamp()
            )
        }
    }
}