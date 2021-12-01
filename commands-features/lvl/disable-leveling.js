const schema = require('../../schema/settings-schema')

module.exports = {
    name: 'disable-leveling',
    aliases: ['off-lvl', 'disable-lvl', 'disablelvl', 'lvldisable', 'lvloff'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(data) {
            await data.delete()
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Disabled leveling system.')
            )
          } else if(!data) {
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Leveling system is already disabled.')
            )
          }
        })
    }
}