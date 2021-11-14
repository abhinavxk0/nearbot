const { RepeatMode } = require('distube');

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    description: 'loops song',
    async execute(client, message, args, Discord) {

        let mode;
        switch(client.distube.setRepeatMode(message, parseInt(args[0]))) {
            case RepeatMode.DISABLED:
                mode = "Off";
                break;
            case RepeatMode.SONG:
                mode = "Repeat a song";
                break;
            case RepeatMode.QUEUE:
                mode = "Repeat all queue";
                break;
        }
        
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor('Repeat Mode')
            .setColor('#A9E9F6')
            .setDescription(`Set repeat mode to \`${mode}\``)
        )
    }
}

