const { embedcolor } = require('../../config.json')

module.exports = {
    name: 'nowplaying',
    async execute(client, message, args, Discord){
        const queue = client.distube.getQueue(message)
        if (!queue){
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription('There is no queue playing right now!')
            )
        }
        const song = client.distube.getQueue(message).songs[0]
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setTitle('now playing...')
                .setThumbnail(song.thumbnail)
                .setDescription(`[${song.name}](${song.url})\n${queue.formattedCurrentTime} - ${formattedDuration}`)
                .setFooter(`Added by ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true} ))
                .addFields(
                    {
                        name: 'Volume: ',
                        value: `${queue.volume}%`,
                        inline: true
                    },
                    {
                        name: 'Autoplay',
                        value: queue.autoplay ? 'On' : 'Off',
                        inline: true
                    }
                )
        
        )
    }
}