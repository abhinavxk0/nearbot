const prefixSchema = require('../../schema/prefix-schema')

module.exports = {
    name: 'resetprefix',
    async execute(client, message, args, Discord){
        const data = await prefixSchema.findOne({
            guild: message.guild.id
        })

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("There is no custom prefix set in this server.")
        )

        let newData = await prefixSchema.findOneAndDelete({
            guild: message.guild.id
        })
        newData.save().then(
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription("The custom prefix set in this server has been reset to \`n!\`.")
            )
        )

    }
}