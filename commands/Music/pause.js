module.exports = {
    name: 'pause',
    async execute(client, message, args, Discord) {

        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        var queue = client.distube.getQueue(message);
        if (!queue) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Nothing's in the queue right now!`)
            )
        }
        client.distube.pause(message);
        message.react('⏸')

        

    }
}