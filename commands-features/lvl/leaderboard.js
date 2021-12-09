const Levels = require('discord-xp');
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    async execute(client, message, args, Discord) {
        const data = await schema.findOne({ Guild: message.guild.id });
        if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Leveling system is **disabled**.")
        );
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
        if (rawLeaderboard.length < 1) return message.reply('there is no leaderboard');
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        const lb = leaderboard.map(
            e => `**${e.position}#** - ${e.username}#${e.discriminator}\n<:spacer:907723859258667038>**Level**: \`${e.level}\`\n<:spacer:907723859258667038>**XP**: \`${e.xp.toLocaleString()}\``
        )
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setAuthor('Leaderboard')
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL({dynamic : true}))
                .setDescription(lb.join("\n\n"))
        )
    }
}