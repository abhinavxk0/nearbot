const DisTube = require('distube');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: "music",
    description: 'plays music',
    async execute(client, message, args, Discord) {
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        const query = args.join(" ");

        if (!query){
            return message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Etner a song URL or query to play.')
            ).then(message => { message.delete({ timeout: 10000 }); })
        }

        client.distube.play(message, query)
    }
}

