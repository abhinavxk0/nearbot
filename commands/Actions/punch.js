const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'punch',
    async execute(client, message, args, Discord){

        const gif = await anime.punch();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${mention.tag} just got punched by ${message.author.tag}! ow!`)
                .setImage(gif)
        )
    }
}