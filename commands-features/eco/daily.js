const config = require('../../config.json');
const commaNumber = require('comma-number')
const moment = require('moment')

module.exports = {
    name: 'daily',
    aliases: ['dl'],
    cooldown: 86400,
    async execute(client, message, args, Discord) {
        const coins = Math.floor(Math.random() * (50000 - 35000) + 35000);
        message.lineReply(`You recieved **$${commaNumber(coins)}** for today!`)
        client.add(message.author.id, coins)
    }
}
