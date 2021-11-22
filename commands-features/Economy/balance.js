const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'balance',
    aliases: ['money', 'bal'],
    async execute(client, message, args, Discord){
        const target = message.mentions.users.first() || message.author;
        const bal = await client.bal(target.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setTitle(`${target.username}'s balance`)
                .setTimestamp()
                .setDescription(`**Balance:** \`$${commaNumber(bal)}\``)
        )
    }
}