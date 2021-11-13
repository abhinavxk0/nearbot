const { Guild } = require('discord.js');
const DisTube = require('distube');

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
        
        client.distube.skip(message)
        message.react('⏩')

    }
}