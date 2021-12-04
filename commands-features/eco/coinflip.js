const commaNumber = require('comma-number')
const flipping = '<a:flipping:911920804357361674>';
const flipped = '<:flipped:911924945225912320>';
const spacer = '<:spacer:907723859258667038>';

module.exports = {
    name: 'coinflip',
    cooldown: 15,
    aliases: ['cf', 'bet'],
    async execute(client, message, args, Discord) {
        const userId = message.author.id
        const userBal = await client.bal(userId)
        let betamount = args[0];
        if (userBal < betamount) {
            return message.lineReply('you do not have enough money to bet that amount!')
        }
        if (betamount > 50000) {
            betamount = 50000
        }
        if (!betamount) {
            return message.lineReply('enter a bet amount!')
        }
        const a = await message.lineReply(`${flipping} |  you bet $${betamount} and...`)
        const randomBool = Math.random() > 0.5 ? true : false;
        const winamt = betamount * 2;
        if (randomBool === true){
            setTimeout(() => {
                a.edit(`${flipped} |  you bet $${betamount} and...\ncongrats youve won! c:`)
            }, 5000);
            client.add(userId, winamt)
        } else {
            setTimeout(() => {
                a.edit(`${flipped} |  you bet $${betamount} and...\naw you lost! :/`)
            }, 5000);
            client.del(userId, betamount)
        }

    }
}