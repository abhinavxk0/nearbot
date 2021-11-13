const config = require('../../config.json')

module.exports = {
    name: 'starboard',
    async execute(client, message, args, Discord) {
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setAuthor('Starboard Commands')
                .addField(`Setup Commands`, `Use \`starboard-channel\` to set the **starboard channel**.
                Use \`starboard-min\` to set **minimum reactions** required for a message to be on the starboard.
                Use \`starboard-disable\` to **disable** NearBot's starboard feature.`)

        )
    }
}