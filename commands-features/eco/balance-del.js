const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'balance-del',
    async execute(client, message, args, Discord) {
        if (message.author != '307777831625293825') return 
        const target = message.mentions.users.first() || message.author;
        client.del(target.id, parseInt(args[0]))

        message.lineReply(`Removed **$${commaNumber(args[0])}** from **${target.username}'s** balance!`)

    }
}