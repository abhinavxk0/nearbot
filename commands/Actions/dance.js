const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'dance',
    async execute(client, message, args, Discord){

        const gif = await anime.dance();
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} is excited!`)
                .setImage(gif)
        )
    }
}