const config = require('../../config.json')
const commaNumber = require('comma-number');

module.exports = {
    name: 'give',
    cooldown: 30,
    aliases: ['donate'],
    async execute(client, message, args, Discord) {
        let userId = message.author.id;
        let userbal = parseInt(await client.bal(userId))
        let toGive = args[0];
        let reciever = message.mentions.users.first();
        
        if (!reciever){
            return message.lineReply('Mention a user')
        }
        if (!reciever.bot) return;

        if (isNaN(toGive)) {
            return message.lineReply('That is not an amount')
        };
        if (userId === reciever.id){
            return message.lineReply('You cant give yourself money')
        }
        if (toGive > userbal) {
            return message.lineReply('Not enough cash!')
        };

        await client.add(reciever.id, parseInt(toGive))
        await client.del(userId, parseInt(toGive))

        message.lineReply(`you gave ${reciever} \`$${commaNumber(parseInt(toGive))}\`!`)

    }
}