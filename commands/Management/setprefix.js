const prefixSchema = require('../../schema/prefix-schema')
const config = require('../../config.json');

module.exports = {
    name: 'setprefix',
    async execute(client, message, args, Discord) {

        const newprefix = args.join(" ");
        const data = await prefixSchema.findOne({
            guild: message.guild.id
        })

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Administrator\` permission!`)
        )

        if (!newprefix) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} ·  If u wanna set a prefix, type it out maybe?`)
        )
        if (newprefix.length > 5) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} ·  You cant spend all those years typing that prefix!\nSet it to something shorter than 5 characters`)
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
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} ·  I set the prefix to \`${newprefix}\` :))`)
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
                        .setColor(config.embedcolor)
                        .setDescription(`${config.greentick} ·  I set the prefix to \`${newprefix}\` :))`)
                )                
            )
        }



    }
}