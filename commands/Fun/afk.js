const schema = require(`../../schema/afk-schema`)

module.exports = {
    name: 'afk',
    async execute(client, message, args, Discord){
        let data;
        try {
            data = await schema.findOne({
                userID: message.author.id,
                guildID: message.guild.id
            })
             
            if (!data){
                data = await schema.create({
                    userID: message.author.id,
                    guildID: message.guild.id
                })
            }
        } catch (error) {
            console.log(error)
        }

        message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setDescription(`**your AFK has been set:**\n${args.join(" ") || "no reason lol"}`)
                .setColor('#A9E9F6')
        )

        data.AFK = true
        data.AFK_Reason = args.join(" ")
        data.time = Date.now()
        await data.save();
    }
}