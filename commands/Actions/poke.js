const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'poke',
    async execute(client, message, args, Discord){

        const gif = await anime.poke();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} pokes ${mention.tag}!`)
                .setImage(gif)
        )
    }
}