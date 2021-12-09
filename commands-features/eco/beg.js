const config = require('../../config.json')
const comnum = require('comma-number')

module.exports = {
    name: 'beg',
    cooldown: 30,
    async execute(client, message, args, Discord){
        const money = parseInt(Math.floor(Math.random() * (500 - 200) + 200));
        const randomBool = Math.random() > 0.1 ? true : false;
        if (randomBool === true){
            client.add(message.author.id, money)
            message.lineReply(`You begged and earned **$${comnum(money)}**.`)
        } else if (randomBool === false) {
            message.lineReply('LOL no-one gave you any money!')
        }
    }
}

