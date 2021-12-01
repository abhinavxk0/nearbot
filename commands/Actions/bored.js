const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'bored',
    async execute(client, message, args, Discord){

        const gif = await anime.bored();

        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} is bored! 😴`)
                .setImage(gif)
        )
    }
}