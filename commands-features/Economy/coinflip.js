/* const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'coinflip',
    cooldown: 15,
    aliases: ['cf'],
    async execute(client, message, args, Discord) {
        if (!args[0]) {
            return message.lineReply('enter a amount to flip :))')
        }
        if (isNaN(args[0])) {
            return message.lineReply('enter some **money** to flip! :v')
        }

        let amount = parseInt(args[0]);
        const bal = await client.bal(message.author.id)
        if (await client.bal(message.author.id) < amount) {
            return message.lineReply(`you only have ${commaNumber(bal)}, you can't bet ${commaNumber(amount)}! :(`)
        }
        if (amount > 50000) {
            amount = 50000
        }

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        }
        if (random() == true) {
            const winam = amount * 2;
            const a = await message.lineReply(`<a:flipping:911920804357361674> | **${message.author.username}** spent \`$${commaNumber(amount)}\` and...`)
            setTimeout(() => {
                a.edit(`<:flipped:911924945225912320> | **${message.author.username}** spent \`$${commaNumber(amount)}\` and...\ncongrats! you won \`$${commaNumber(winam)}\``)
                client.add(message.author.id, parseInt(winam))
            }, 3000);

        } else {
            const a = await message.lineReply(`<a:flipping:911920804357361674> | **${message.author.username}** spent \`$${commaNumber(amount)}\` and...`)
            setTimeout(() => {
                a.edit(`<:flipped:911924945225912320> | **${message.author.username}** spent \`$${commaNumber(amount)}\` and...\noh no! you lost \`$${commaNumber(amount)}\`, better luck next time! :')`)
                client.del(message.author.id, parseInt(amount))
            }, 3000)

        }
    }
} */