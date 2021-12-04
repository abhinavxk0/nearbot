const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')
const pag = require('discord.js-pagination')
const timeout = 10000;
const emojis = ['⬅️', '➡️']
module.exports = {
    name: 'rich',
    aliases: ['ri'],
    cooldown: 30,
    async execute(client, message, args, Discord) {
        const collection = new Discord.Collection();

        await Promise.all(
            message.guild.members.cache.map(
                async (member) => {
                    const id = member.id;
                    const bal = await client.bal(id)
                    return bal !== 0 ? collection.set(id, {
                        id, bal
                    })
                        : null
                })
        )
        const data = collection.sort((a, b) => b.bal - a.bal).first(9)
        const lb = data.map((v, i) => {
            return `**0${i + 1}#** - ${client.users.cache.get(v.id).tag}\n<:spacer:907723859258667038>\`$${commaNumber(v.bal)}\``
        })

        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setAuthor('Guild Leaderboard')
                .setDescription(lb)
                .setTimestamp()
        )


    }
}