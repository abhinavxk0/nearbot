const db = require('quick.db')
const { embedcolor } = require('../../config.json')
const djSchema = require('../../schema/djrole-schema')
const config = require('../../config.json')

module.exports = {
    name: 'skip',
    aliases: ['next'],
    async execute(client, message, args, Discord) {

        const djuser = await db.fetch(`djuser.${message.guild.id}`);

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

        if (djuser){
            if (message.author.id !== djuser){
                return message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(config.embedcolor)
                        .setDescription(`You're not the DJ for this session!`)
                )
            }
        }

        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The queue is empty!')
        )

        if (queue.songs.length === 1) {
            const a = await message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`loading <a:loading:910721336542916660>`)
            )

            client.distube.stop(message).then(
                message.react('⏩'),
                a.delete()
            ).catch((err) => console.log(err))
            const Schema = require('../../schema/djrole-schema');
            if (Schema) {
                if (djuser) {
                    const dju = message.guild.member(djuser);
                    try {
                        dju.remove(Schema.roleId)
                    } catch (error) {
                        throw err;
                    }
                }
            }
            db.delete(`djuser.${message.guild.id}`)
        }

        else {
            const a = await message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`loading <a:loading:910721336542916660>`)
            )
            client.distube.skip(message).then(
                message.react('⏩')
            ).catch((err) => console.log(err))
            try {
                a.delete()
            } catch (err) {
                throw err;
            }
        }

    }
}