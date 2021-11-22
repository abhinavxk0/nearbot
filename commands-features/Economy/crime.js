const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'crime',
    cooldown: 60 * 20,
    async execute(client, message, args, Discord){

        const per = Math.floor(Math.random() * 99) + 1;
        let reward = Math.floor(Math.random() * 6000) + 2000;
        let lose = Math.floor(Math.random() * 6000) + 2000;

        let winlose;
        if (per > 60){
            winlose = true;
        } else {
            winlose = false;
        }
        
        if (winlose == true){
            client.add(message.author.id, reward)
            message.lineReply(`you commited a crime and collected \`$${commaNumber(coins)}\` for your crime!`)
        } else {
            client.del(message.author.id, lose)
            message.lineReply(`The police caught you and you were fined \`$${commaNumber(lose)}\` for your crime!`)
        }
        
    }
}