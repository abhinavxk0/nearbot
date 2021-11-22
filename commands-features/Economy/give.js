const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'give',
    aliases: ['donate'],
    async execute(client, message, args, Discord){
        const target = message.mentions.members.first()
        if (!target){
            return message.lineReply('mention a user to give coins to :)')
        }
        const givecoins = args[1]
        if (!givecoins){
            return message.lineReply(`enter an amount to give to ${target.username}`)
        }
        if (isNaN(givecoins)){
            return message.lineReply(`enter money to give to ${target.username}`)
        }
        const bal = await client.bal(message.author.id)
        if (bal < givecoins){
            return message.lineReply(`you dont have enough money to give \`$${commaNumber(givecoins)}\``)
        }
        await client.add(target.id, givecoins)
        await client.del(message.author.id, givecoins)
        message.lineReply(`you gave ${commaNumber(givecoins)} to ${target} :D`)
        
    }
}