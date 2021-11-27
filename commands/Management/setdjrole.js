const Schema = require('../../schema/djrole-schema');
const config = require('../../config.json');

module.exports = {
    name: 'setdjrole',
    async execute(client, message, args, Discord) {
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`${config.redtick} · You lack \`Administrator\` permission!`)
        )

        const queue = await client.distube.getQueue(message);
        if (!queue) {
            const djRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            if (!djRole) return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`${config.redtick} · Mention or enter DJ role ID.`)
            )

            const data = await Schema.findOne({
                guildId: message.guild.id
            });

            if (data) {
                await Schema.findOneAndRemove({
                    guildId: message.guild.id
                });
                let newData = new Schema({
                    guildId: message.guild.id,
                    roleId: djRole.id
                })
                await newData.save();
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} · I set the DJ role to ${djRole}.`)
                        .setTimestamp()
                )
            } else if (!data) {
                let newData = new Schema({
                    guildId: message.guild.id,
                    roleId: djRole.id
                })
                await newData.save();
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} · I set the DJ role to ${djRole}.`)
                        .setTimestamp()
                )
            }
        } else {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`You cannot set the DJ role when music is playing.`)
                    .setFooter('As it might cause major issues.')
            )
        }





    }
}