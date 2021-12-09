const commaNumber = require('comma-number')
const flipping = '<a:flipping:911920804357361674>';
const flipped = '<:flipped:911924945225912320>';

module.exports = {
    name: 'coinflip',
    cooldown: 15,
    aliases: ['cf', 'bet'],
    async execute(client, message, args, Discord) {
        const userId = message.author.id
        const userBal = await client.bal(userId)
        let betamount = args[0];
        if (userBal < betamount) {
            return message.lineReply('You do not have enough money to bet that amount!')
        }
        if (betamount > 50000) {
            betamount = 50000
        }
        if (!betamount) {
            return message.lineReply('Enter a bet amount!')
        }
        if (userBal >= 50000){
            if (args[0].toLowerCase() === 'all'){
                betamount = 50000
            }
        }
        if (isNaN(betamount)){
            return message.lineReply('Enter an **amount**.')
        }
        const a = await message.lineReply(`${flipping} |  You bet **$${commaNumber(betamount)}** and...`)
        const randomBool = Math.random() > 0.5 ? true : false;
        const winamt = betamount * 2;
        if (randomBool === true){
            setTimeout(() => {
                a.edit(`${flipped} |  You bet **$${commaNumber(betamount)}** and...\nCongrats you won! c:\nYou now have **$${commaNumber(userBal + winamt)}**.`)
            }, 5000);
            client.add(userId, winamt)
        } else {
            setTimeout(() => {
                a.edit(`${flipped} |  You bet **$${commaNumber(betamount)}** and...\nAw you lost! :/\nYou now have **$${commaNumber(userBal - betamount)}**`)
            }, 5000);
            client.del(userId, betamount)
        }

    }
}