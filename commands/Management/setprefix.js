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
                .setDescription(`u do not have the \`ADMINISTRATOR\` permission to use this command lol`)
        )

        if (!newprefix) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`if u wanna set a prefix, type it out maybe?`)
        )
        if (newprefix.length > 5) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`you cant spend all those years typing that prefix\nset it to something shorter than 5 characters`)
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
                        .setColor('#A9E9F6')
                        .setDescription(`i set the prefix to \`${newprefix}\` :))`)
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
                        .setColor('#A9E9F6')
                        .setDescription(`prefix has been set to \`${newprefix}\`!!`)
                )                
            )
        }



    }
}