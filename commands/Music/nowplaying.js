const { embedcolor } = require('../../config.json')

module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'now'],
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
        const progressBar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';

        const target = song.duration;
        const current = queue.currentTime;

        const ratio = Math.floor((current / target) * progressBar.length);

        const newProgressBar = progressBar.substring(0, ratio) + '<:greendot:909726274711322664>' + progressBar.substring(ratio + 1, progressBar.length)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setTitle('now playing...')
                .setThumbnail(song.thumbnail)
                .setDescription(`[${song.name}](${song.url})\n${queue.formattedCurrentTime} - ${newProgressBar} - ${queue.formattedDuration}`)
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