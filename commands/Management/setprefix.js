const prefixSchema = require('../../schema/prefix-schema')

module.exports = {
    name: 'setprefix',
    async execute(client, message, args, Discord) {

        const newprefix = args.join(" ");
        const data = await prefixSchema.findOne({
            guild: message.guild.id
        })

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`ADMINISTRATOR\` permission to use this command.`)
        )

        if (!newprefix) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Please enter a prefix.`)
        )
        if (newprefix.length > 5) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Please enter a prefix under **5** characters.`)

        )

        if ( data ){
            await prefixSchema.findOneAndRemove({
                guild: message.guild.id
            })
            let newData = new prefixSchema({
                guild: message.guild.id,
                prefix: newprefix
            })
            newData.save().then(
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor('#defafe')
                        .setDescription(`The **custom prefix** for this server has been set to \`${newprefix}\``)
                )
            )
        } else if (!data){
            let newData = new prefixSchema({
                guild: message.guild.id,
                prefix: newprefix
            })
            newData.save().then(
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor('#defafe')
                        .setDescription(`The **custom prefix** for this server has been set to \`${newprefix}\``)
                )                
            )
        }



    }
}