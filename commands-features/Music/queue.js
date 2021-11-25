const pagination = require('discord.js-pagination')
const { embedcolor } = require('../../config.json')
const db = require('quick.db');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    async execute(client, message, args, Discord) {
        var queue = client.distube.getQueue(message);
        if (!queue) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`Nothing's in the queue right now!`)
            )
        }

        const rawtime = queue.duration;
        const minproctime = Math.round(rawtime / 60);
        const current = client.distube.getQueue(message).songs[0]
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = message.guild.member(djUser)
        let proctime;
        if (minproctime > 60) {
            proctime = `${Math.round(minproctime / 60)} hours`
        } else {
            proctime = `${minproctime} mins`
        }
        
        message.lineReply(
            new Discord.MessageEmbed()
                .setAuthor('Queue', client.user.displayAvatarURL({ dynamic : true}))
                .setColor(embedcolor)
                .setDescription(`**now playing:**\n[${current.name}](${current.url}) - \`${queue.formattedCurrentTime} / ${current.formattedDuration}\`` + '\n\n' + queue.songs.map((song, id) =>
                    `**${id + 1}#**<:spacer:907723859258667038>[${song.name}](${song.url}) - \`${song.formattedDuration}\``
                ).slice(1, 10).join("\n\n"))
                .addField('Queue Duration:', proctime, true)
                .addField('Current DJ:', `${djmember.user.tag}`, true)
        )
    }
}
