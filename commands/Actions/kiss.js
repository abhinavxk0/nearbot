const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'kiss',
    async execute(client, message, args, Discord){

        const gif = await anime.kiss();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} kissed ${mention.tag}! so cute 💕`)
                .setImage(gif)
        )
    }
}