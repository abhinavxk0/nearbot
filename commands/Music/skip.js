module.exports = {
    name: 'skip',
    category: "music",
    description: 'skips music',
    async execute(client, message, args, Discord) {
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#defafe')
                .setDescription('The queue is empty!')
        )
        client.distube.skip(message)
        message.react('⏩')

    }
}