module.exports = {
    name: 'jump',
    async execute(client, message, args, Discord){

        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        
        if (isNaN(args[0])) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Enter a song number (in the queue) to jump to!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        client.distube.jump(message, parseInt(args[0] - 1)).catch(
            err => message.channel.send("Invalid song number." + err));
    
    }
}