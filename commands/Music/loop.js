const { embedcolor } = require('../../config.json')

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    description: 'loops song',
    async execute(client, message, args, Discord) {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Nothing's in the queue right now!`)
        )
        if (!args[0]) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`Enter a loop setting. (\`off, song, queue\`)`)
        )
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        message.lineReply(
            new Discord.MessageEmbed()
            .setAuthor('Repeat Mode')
            .setColor('#A9E9F6')
            .setDescription(`Set repeat mode to \`${mode}\``)
        )
    }
}

