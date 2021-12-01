const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'bonk',
    async execute(client, message, args, Discord){

        const gif = await anime.bonk();
        const mention = message.mentions.users.first();

        if (!mention) return
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${mention.tag} got bonked by ${message.author.tag}`)
                .setImage(gif)
        )
    }
}