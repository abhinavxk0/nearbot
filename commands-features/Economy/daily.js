const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'daily',
    cooldown: 86400,
    async execute(client, message, args, Discord){
        const coins = Math.floor(Math.random() * 2000) + 1500;

        message.lineReply(`You recieved \`$${commaNumber(coins)}\` for today!`)
        .then(
            client.add(message.author.id, coins)
        )
    }
}
