
const pag = require('discord.js-pagination')
const config = require('../../config.json')
const db = require('quick.db');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    async execute(client, message, args, Discord) {
        var queue = client.distube.getQueue(message);
        if (!queue) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
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
            proctime = `${Math.round(minproctime / 60)} hour(s)`
        } else {
            proctime = `${minproctime} mins`
        }

        const pageOne = new Discord.MessageEmbed()
            .setAuthor('Queue', client.user.displayAvatarURL({ dynamic: true }))
            .setColor(config.embedcolor)
            .setDescription(`**now playing:**\n[${current.name}](${current.url}) - \`${queue.formattedCurrentTime} / ${current.formattedDuration}\`` + '\n\n' + queue.songs.map((song, id) =>
                `**${id + 1}#**<:spacer:907723859258667038>[${song.name}](${song.url}) - \`${song.formattedDuration}\``
            ).slice(1, 15).join("\n\n"))
            .addField('Queue Duration:', `${proctime}, ${queue.songs.length} songs`, true)
            .addField('Current DJ:', `${djmember.user.tag}`, true)

        if (queue.songs.length > 10 && queue.songs.length < 30) {
            const pageTwo = new Discord.MessageEmbed()
                .setAuthor('Queue', client.user.displayAvatarURL({ dynamic: true }))
                .setColor(config.embedcolor)
                .setDescription(`**now playing: **\n[${current.name}](${current.url}) - \`${queue.formattedCurrentTime} / ${current.formattedDuration}\`` + '\n\n' + queue.songs.map((song, id) =>
                    `**${id + 1}#**<:spacer:907723859258667038>[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                    .slice(11, queue.songs.length))
                .addField('Queue Duration:', `${proctime}, ${queue.songs.length} songs`, true)
                .addField('Current DJ:', djmember.user.tag, true)

            pag(message, [pageOne, pageTwo], ['⬅️', '➡️'], 30000);
        } else {
            message.lineReplyNoMention(pageOne)
        }

    }
}
