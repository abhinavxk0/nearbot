const config = require('../../config.json')

module.exports = {
    name: 'topservers',
    aliases: ['topguilds'],
    async execute(client, message, args, Discord){
        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);

        const des = guilds.map((guild, index) =>{
            return `**${index + 1}#**${config.spacer}${guild.name}\n${config.replyicon} \`${guild.memberCount}\` members`
        }).join("\n\n")

        message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle('Top Guilds')
                .setDescription(des)
        )
    }
}