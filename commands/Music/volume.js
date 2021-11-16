module.exports = {
    name: 'volume',
    aliases: ['vol', 'v'],
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('I am not currently playing in this guild.')
        ).then(message => { message.delete({ timeout: 10000 }); })

        if (memberVC !== clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You need to be in ${message.guild.me.voice.channel} to execute this command!`)
        ).then(message => { message.delete({ timeout: 10000 }); })

        if (args[0] > 200) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("ow! dont blow someone's ear off! volume should be below 100!")
        ).then(message => {message.delete({timeout:10000})})

        if (isNaN(args[0])) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("The volume should be a number, right?")
        )


        client.distube.setVolume(message, Number(args[0]));
        message.lineReplyNoMention(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`The volume has been set to **${args[0]}%**!`)
        )
    }
}