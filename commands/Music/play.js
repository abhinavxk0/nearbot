const DisTube = require('distube');

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 15,
    category: "music",
    description: 'plays music',
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        const clientVC = message.guild.me.voice.channel;
        if (!memberVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        if (memberVC !== clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You need to be in ${message.guild.me.voice.channel} to execute this command!`)
        ).then(message => { message.delete({ timeout: 10000 }); })
        const query = args.join(" ");

        if (!query){
            return message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Enter a song URL or query to play!')
            ).then(message => { message.delete({ timeout: 10000 }); })
        }

        client.distube.play(message, query)
    }
}

