const { RepeatMode } = require('distube');
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
        message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
    }
}

