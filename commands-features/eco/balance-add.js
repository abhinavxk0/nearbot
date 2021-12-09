const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'balance-add',
    async execute(client, message, args, Discord) {
        if (message.author != '307777831625293825') return 
        const target = message.mentions.users.first() || message.author;
        client.add(target.id, parseInt(args[0]))
        message.lineReply(`Added **$${commaNumber(args[0])}** to **${target.username}'s** balance!`)

    }
}