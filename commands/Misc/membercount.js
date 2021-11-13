module.exports = {
    name: 'membercount',
    execute(client, message, args, Discord) {
        const { guild } = message
        const { memberCount } = guild;
        const botCount = message.guild.members.cache.filter((m) => m.user.bot).size;
        const humanCount = memberCount - botCount
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setAuthor('Members')
                .setTimestamp()
                .addFields(
                    {
                        name: 'Total Count',
                        value: memberCount,
                        inline: true,
                    },
                    {
                        name: 'Human Count',
                        value: humanCount,
                        inline: true,
                    },
                    {
                        name: 'Bot Count',
                        value: message.guild.members.cache.filter((m) => m.user.bot).size,
                        inline: true,
                    }
                )
                
        )
    }
}