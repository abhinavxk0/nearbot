const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'crime',
    cooldown: 60 * 5,
    async execute(client, message, args, Discord){


        let reward = Math.floor(Math.random() * 8000) + 2000;
        let lose = Math.floor(Math.random() * 1300) + 1000;
        let bal = await client.bal(message.author.id)
        if (bal < 1500){
            return message.lineReply(`you need to atleast have \`$1500\` in your balance!`)
        }
        const randomBool = Math.random() > 0.4 ? true : false;
        
        if (randomBool === true){
            client.add(message.author.id, reward)
            message.lineReply(`you commited a crime and collected \`$${commaNumber(reward)}\` for your crime!`)
        } else {
            client.del(message.author.id, lose)
            message.lineReply(`The police caught you and you were fined \`$${commaNumber(lose)}\` for your crime!`)
        }
        
    }
}