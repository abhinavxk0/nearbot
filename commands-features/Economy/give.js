const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'give',
    aliases: ['donate'],
    execute(client, message, args, Discord) {
        let userId = message.author.id;
        let target = message.mentions.users.first();
        let targetId = target.id;
        let userbal = client.bal(userId);

        let toGive = args[0];
        if (userbal < toGive) {
            return message.lineReply('you dont have enough money to give that much')
        }

        if (isNaN(toGive)) {
            return message.lineReply('enter an amount you wanna give')
        }
        
        toGive = parseInt(toGive);

        client.del(userId, toGive);
        client.add(targetId, toGive);
        message.lineReply(`you gave \`$${commaNumber(toGive)}\` to **${target}**`)
    }
}