const db = require('quick.db')
const { embedcolor } = require('../../config.json')
const djSchema = require('../../schema/djrole-schema')
const config = require('../../config.json')

module.exports = {
    name: 'resume',
    aliases: ['unpause'],
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        if (!message.guild.me.hasPermission("SPEAK")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I cannot play music in this channel, I am lacking the \`SPEAK\` permission!`)
        )  

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
        var queue = client.distube.getQueue(message);
        if (!queue) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Nothing's in the queue right now!`)
            )
        }
        const djuser = await db.fetch(`djuser.${message.guild.id}`);
        if (djuser){
            const dju = message.guild.member(djuser);
            if (message.author.id !== dju.id){
                return message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`You're not the DJ for this session!`)
                )
            }
        }
        if (queue.paused){
            client.distube.resume(message)
        message.react('▶')
        } else {
            message.lineReply('the music session is already playing')
        }
    }
}