const DisTube = require('distube');

module.exports = {
    name: 'play',
    aliases: ['p'],
    cooldown: 15,
    category: "music",
    description: 'plays music',
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.channel.send(`❌ | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.channel.send(`❌ | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.channel.send(`❌ | You must be in the same channel as ${message.client.user}!`);
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

