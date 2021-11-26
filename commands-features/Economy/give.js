const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'give',
    aliases: ['donate'],
    async execute(client, message, args, Discord) {
        var userId = message.author.id;
        var target = message.mentions.users.first();
        var targetId = target.id;
        var userbal = await client.bal(userId);

        let toGive = args[0];
        if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            toGive = args[1]
        };
        if (isNaN(toGive)) {
            return message.lineReply('enter an amount you wanna give')
        }
        toGive = parseInt(toGive);
        if (userbal < toGive) {
            return message.lineReply('you dont have enough money to give that much')
        }
        client.add(targetId, toGive);
        client.del(userId, toGive);
        message.lineReply(`you gave \`$${commaNumber(toGive)}\` to **${target}**`)
    }
}