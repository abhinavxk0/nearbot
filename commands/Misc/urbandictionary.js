const urban = require('relevant-urban')

module.exports = {
    name: 'urbandictionary',
    aliases: ['urban', 'ud'],
    async execute(client, message, args, Discord) {

        if (message.channel.nsfw == false) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('This command is restricted to NSFW channels as the results might be explicit.')
        )

        if (!args.length) {

            const word = await urban.random()

            a.edit(
                    new Discord.MessageEmbed()
                        .setColor('#A9E9F6')
                        .setTimestamp()
                        .setTitle(`"${word.word}" - Urban Dictionary`)
                        .setURL(`${word.urbanURL}`)
                        .setDescription(`<:spacer:907723859258667038>${word.definition}`)
                        .addField(`Example`, `*${word.example}*`)
                        .setFooter(`👍 ${word.thumbsUp} | 👎 ${word.thumbsDown} | ✍ ${word.author}`)
            )

        } else {
            try {
                const word = await urban(`${args.join(" ")}`)
                message.lineReply(
                        new Discord.MessageEmbed()
                            .setColor('#A9E9F6')
                            .setTimestamp()
                            .setTitle(`"${word.word}" - Urban Dictionary`)
                            .setURL(`${word.urbanURL}`)
                            .setDescription(`<:spacer:907723859258667038>${word.definition}`)
                            .addField(`Example`, `*${word.example}*`)
                            .setFooter(`👍 ${word.thumbsUp} | 👎 ${word.thumbsDown} | ✍ ${word.author}`)
                )
            } catch (error) {
                err('No results from the urban dictionary')
            }

        }

    }
}