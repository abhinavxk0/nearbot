const config = require('../../config.json');
const commaNumber = require('comma-number')
const moment = require('moment')

module.exports = {
    name: 'daily',
    aliases: ['dl'],
    cooldown: 86400,
    async execute(client, message, args, Discord) {
        let coins = Math.floor(Math.random() * (50000 - 35000) + 35000);
        let day = moment().weekday();
        if (day == 6 || day == 7) {
            let coins = Math.floor(Math.random() * (75000 - 50000) + 50000);
            message.lineReply(`It's a weekend! 🏖️\nYou recieved **$${commaNumber(coins)}** for today!`)
            await client.add(message.author.id, coins)
            return;
        } else {
            message.lineReply(`You recieved **$${commaNumber(coins)}** for today!`)
            await client.add(message.author.id, coins)
        }
    }
}
