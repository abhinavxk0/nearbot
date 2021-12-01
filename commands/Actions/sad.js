const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'sad',
    async execute(client, message, args, Discord){

        const gif = await anime.sad();
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} is sad... 🙁`)
                .setImage(gif)
        )
    }
}