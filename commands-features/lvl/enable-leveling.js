const schema = require('../../schema/settings-schema')

module.exports = {
    name: 'enable-leveling',
    aliases: ['on-lvl', 'enable-lvl', 'enablelvl', 'lvl-enable', 'lvlon'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )
      schema.findOne({ 
          Guild: message.guild.id 
        }, async (err, data) => {
        if (!data) {
          new schema({
            Guild: message.guild.id,
          }).save();
          message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription('Enabled leveling system.')
        )
        } else if (data) {
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Leveling system is enabled already.')
            )
        }
      });
    }
}