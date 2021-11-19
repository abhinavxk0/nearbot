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
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("there is no custom prefix set! 😞")
        )

        let newData = await prefixSchema.findOneAndDelete({
            guild: message.guild.id
        })
        newData.save().then(
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription("the custom prefix for this server has been reset to \`n!\`.")
            )
        )

    }
}