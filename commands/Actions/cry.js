const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'cry',
    async execute(client, message, args, Discord){

        const gif = await anime.cry();
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} is crying! 😭`)
                .setImage(gif)
        )
    }
}