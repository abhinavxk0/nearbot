const prefixSchema = require('../../schema/prefix-schema')
const config = require('../../config.json')
module.exports = {
    name: 'resetprefix',
    async execute(client, message, args, Discord){
        const data = await prefixSchema.findOne({
            guild: message.guild.id
        })

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Administrator\` permission!`)
        )

        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} ·  There is no custom prefix set! 😞`)
        )

        let newData = await prefixSchema.findOneAndDelete({
            guild: message.guild.id
        })
        newData.save().then(
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} ·  The custom prefix for this server has been reset to \`n!\`.`)
            )
        )

    }
}