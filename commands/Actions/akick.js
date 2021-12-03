const config = require('../../config.json');
const anime = require('anime-actions');

module.exports = {
    name: 'akick',
    async execute(client, message, args, Discord){

        const gif = await anime.kick();
        const mention = message.mentions.users.first();

        if (!mention) return 
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor(`${message.author.tag} kick ${mention.tag}! that looks like it hurt!`)
                .setImage(gif)
        )
    }
}