const config = require('../../config.json')
const commaNumber = require('comma-number');
const passiveSchema = require('../../schema/passive');
module.exports = {
    name: 'give',
    cooldown: 30,
    aliases: ['donate'],
    async execute(client, message, args, Discord) {
        let userId = message.author.id;
        let userbal = parseInt(await client.bal(userId))
        let toGive = args[0];
        let reciever = message.mentions.users.first();

        if (!reciever) {
            return message.lineReply('Mention a user')
        }
        const targetdata = await passiveSchema.findOne({
            userId: reciever.id
        });
        const authordata = await passiveSchema.findOne({
            userId: message.author.id
        });

        if (targetdata) return message.lineReply(`**${reciever.username}** is training to become a monk, leave them alone!`)
        if (authordata) return message.lineReply("hey! you're a **passive** monk, you cant rob people!")

        if (isNaN(toGive)) {
            return message.lineReply('That is not an amount')
        };
        if (userId === reciever.id) {
            return message.lineReply('You cant give yourself money')
        }
        if (toGive > userbal) {
            return message.lineReply('Not enough cash!')
        };

        await client.add(reciever.id, parseInt(toGive))
        await client.del(userId, parseInt(toGive))

        message.lineReply(`you gave ${reciever} **$${commaNumber(parseInt(toGive))}**!`)

    }
}