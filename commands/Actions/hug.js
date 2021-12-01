const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'hug',
    async execute(client, message, args, Discord){

        const gif = await anime.hug();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} hugs ${mention.tag}! so wholesome 😊😊`)
                .setImage(gif)
        )
    }
}