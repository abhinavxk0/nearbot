const db = require('quick.db')
const { embedcolor } = require('../../config.json')
module.exports = {
    name: 'autoplay',
    aliases: ['ap'],
    async execute(client, message, args, Discord){
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The queue is empty!')
        )

        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = await message.guild.member(djUser)
        const djRole = await db.fetch(`djrole.${message.guild.id}`)
        if (djRole){
            if (message.member.id != djUser) return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`you are not the dj for this music session!\n${djmember} is the current dj`)            
            )
        }

        const a = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )

        let mode = client.distube.toggleAutoplay(message).then(
            a.delete()
        )
        message.lineReplyNoMention(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`")
        );

    }
}