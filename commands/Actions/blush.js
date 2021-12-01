const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'blush',
    async execute(client, message, args, Discord){

        async function blush () {
            const gif = await anime.blush();
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setAuthor(`${message.author.tag} is blushing!`)
                    .setImage(gif)
            )
        }
        blush();
    }
}