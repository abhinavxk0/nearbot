const { embedcolor, errorcolor } = require('../../config.json')

module.exports = {
    name: 'work',
    cooldown: 3600,
    async execute(client, message, args, Discord){
        const coins = Math.floor(Math.random() * 950) + 500;
        const jobs = ['a builder', 'a waiter', 'a driver', 'a programmer', 'a chef', 'a doctor', 'a Discord Mod', 'an accountant', 'a footballer']
        const jobIndex = Math.floor(Math.random() * jobs.length);
        
        message.lineReply(`you worked as ${jobs[jobIndex]} and earned \`$${commaNumber(coins)}\`!`)
        .then(
            client.add(message.author.id, coins)
        )
    }
}