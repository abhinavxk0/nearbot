module.exports = {
    name: 'stop',
    category: "music",
    description: 'stops music',
    async execute(client, message, args, Discord) {
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        let queue = await client.distube.getQueue(message);
        if (queue) {
            
            client.distube.stop(message)

            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Disconnected!')
            )
        } else if (!queue) {
            return
        };
    }
}

