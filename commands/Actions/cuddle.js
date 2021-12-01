const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'cuddle',
    async execute(client, message, args, Discord){

        const gif = await anime.cuddle();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} cuddles ${mention.tag}! aww 🥰`)
                .setImage(gif)
        )
    }
}