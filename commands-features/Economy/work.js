const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')
module.exports = {
    name: 'work',
    cooldown: 60 * 60,
    async execute(client, message, args, Discord){
        const coins = Math.floor(Math.random() * (2500 - 1000)) + 1000;
        const jobs = ['a builder', 'a waiter', 'a driver', 'a programmer', 'a chef', 'a doctor', 'a Discord Mod', 'an accountant', 'a footballer']
        const jobIndex = Math.floor(Math.random() * jobs.length);
        
        message.lineReply(`You worked as ${jobs[jobIndex]} and earned \`$${commaNumber(coins)}\`!`)
        .then(
            client.add(message.author.id, coins)
        )
    }
}
