const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    aliases: ['sinfo', 'server'],
    async execute(client, message, args, Discord) {
        const { guild } = message;
        const guildCreated = moment(guild.createdTimestamp).format("LLL")
        const totalChannels = guild.channels.cache.filter((ch) => ch.type === 'text').size + guild.channels.cache.filter((ch) => ch.type === 'voice').size
        const { memberCount } = guild;
        const botCount = message.guild.members.cache.filter((m) => m.user.bot).size;
        const humanCount = memberCount - botCount

        if (guild.premiumSubscriptionCount == 0) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .addFields(
                        {
                            name: '__General Info__',
                            value: `**Name**: ${guild.name}
**Guild ID**: ${guild.id}
**Owner**: ${guild.owner}
**Created**: ${guildCreated}; ${moment(guild.createdTimestamp).fromNow()}
**Icon**: [Click Here](${guild.iconURL({ dynamic: true })})`,
                            inline: true,
                        },
                        {
                            name: '__Counts__',
                            value: `**Role**: ${guild.roles.cache.size - 1} roles
**Channels**: ${totalChannels} Total 
(__Text__: ${guild.channels.cache.filter((ch) => ch.type === 'text').size}, __Voice__: ${guild.channels.cache.filter((ch) => ch.type === 'voice').size})
**Emojis**: ${guild.emojis.cache.size} Total
(__Static__: ${guild.emojis.cache.filter((e) => !e.animated).size}, __Animated__: ${guild.emojis.cache.filter((e) => e.animated).size})`,
                            inline: true,
                        },
                        {
                            name: '__Member Count__',
                            value: `**Total**: ${memberCount} members
(__Humans__: ${humanCount}, __Bots__: ${botCount})`
                        },
                    )

            )
        } else {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .addFields(
                        {
                            name: '__General Info__',
                            value: `**Name**: ${guild.name}
**Guild ID**: ${guild.id}
**Created**: ${guildCreated}, ${moment(guild.createdTimestamp).fromNow()}
**Icon**: [Click Here](${guild.iconURL({ dynamic: true })})`,
                            inline: true,
                        },
                        {
                            name: '__Counts__',
                            value: `**Role**: ${guild.roles.cache.size} roles
**Channels**: ${totalChannels} Total 
(__Text__: ${guild.channels.cache.filter((ch) => ch.type === 'text').size}, __Voice__: ${guild.channels.cache.filter((ch) => ch.type === 'voice').size})
**Emojis**: ${guild.emojis.cache.size} Total
(__Static__: ${guild.emojis.cache.filter((e) => !e.animated).size}, __Animated__: ${guild.emojis.cache.filter((e) => e.animated).size})`,
                            inline: true,
                        },
                        {
                            name: '__Member Count__',
                            value: `**Total**: ${memberCount} members
(__Humans__: ${humanCount}, __Bots__: ${botCount})`
                        },
                        {
                            name: '__Server Boost Info__',
                            value: `**Boost Tier**: ${guild.premiumTier ? `Tier ${guild.premiumTier}` : 'None'}
**Boost Count**: ${guild.premiumSubscriptionCount}`,
                            inline: true,
                        },
                    )

            )
        }
    }
}