const { embedcolor, errorcolor } = require('../../config.json')
const db = require('quick.db')

module.exports = {
    name: 'bassboost',
    aliases: ['bb'],
    async execute(client, message, args, Discord){

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
        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The queue is empty!')
        )

        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = await message.guild.member(djUser)
        if (message.member.id != djUser) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`you are not the dj for this music session!\n${djmember} is the current dj`)            
        )

        client.distube.setFilter(message, bassboost)

    }
}