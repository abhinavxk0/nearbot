const pagination = require('discord.js-pagination')
const { embedcolor } = require('../../config.json')

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
                .setDescription(queue.songs.map((song, id) =>
                    `**${id + 1}#** -<:spacer:907723859258667038>[${song.name}](${song.url}) - \`${song.formattedDuration}\``
                ).slice(0, 10).join("\n\n"))
                .addField('queue duration:', proctime)
        )
    }
}
