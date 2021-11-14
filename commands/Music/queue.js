const DisTube = require('distube');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: "music",
    description: 'shows song queue',
    async execute(client, message, args, Discord) {

        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#defafe')
                .setDescription('The queue is empty!')
        )

        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setTitle('Queue')
                .setDescription(queue.songs.map((song, id) =>
                    `**0${id + 1}#**<:spacer:907723859258667038>${song.name} - \`${song.formattedDuration}\``
                ).slice(0, 5).join("\n\n"))
                .setFooter(`playing in ${message.guild.name}`)
        );
    }
}   
