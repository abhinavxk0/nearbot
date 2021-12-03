const db = require('quick.db')
const { embedcolor } = require('../../config.json')
const djSchema = require('./schema/djrole-schema');

module.exports = {
    name: 'autoplay',
    aliases: ['ap'],
    async execute(client, message, args, Discord) {
        if (!message.member.voice.channel) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        if (!message.guild.me.hasPermission("SPEAK")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I cannot play music in this channel, I am lacking the \`SPEAK\` permissions!`)
        )

        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The queue is empty!')
        )
        const djRoles = await djSchema.findOne({
            guildId: message.guild.id
        })
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = await message.guild.member(djUser)
        if (djRoles) {
            if (!message.member.id === djUser) return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`You are not the DJ for this music session!\n${djmember} is the current DJ.`)
            )
        }

        const a = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )

        let mode = client.distube.toggleAutoplay(message)
        try {
            a.delete()
        } catch (err) {
            throw err;
        }

        message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`")
        );

    }
}