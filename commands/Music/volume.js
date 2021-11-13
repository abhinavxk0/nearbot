module.exports = {
    name: 'volume',
    aliases: ['vol'],
    async execute(client, message, args, Discord) {
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        if (args[0] > 200) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Use a value below 200!')
        ).then(message => {message.delete({timeout:10000})})

        if (isNaN(args[0])) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("The volume should be a number, right?")
        )


        client.distube.setVolume(message, args[0]);
        message.lineReplyNoMention(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setAuthor(`Volume updated!`)
            .setDescription(`The volume has been set to ${args[0]}`)
        )
    }
}