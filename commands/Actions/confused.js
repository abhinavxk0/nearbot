const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'confused',
    async execute(client, message, args, Discord){

        const gif = await anime.confused();
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} is confused... 🤔`)
                .setImage(gif)
        )
    }
}