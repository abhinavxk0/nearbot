const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'kill',
    async execute(client, message, args, Discord){

        const gif = await anime.kill();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} killed ${mention.tag}! jesus...`)
                .setImage(gif)
        )
    }
}