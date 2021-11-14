const pagination = require('discord.js-pagination')
const config = require('../../config.json')

module.exports = {
    name: 'help',
    execute(client, message, args, Discord) {
        const emojis = [
            "⬅️", "➡️"
        ]
        const timeout = '100000';
        const pagemain = new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
            .setTitle('Invite me!')
            .setAuthor(`Help for NearBot`, client.user.avatarURL({ dynamic: true }))
            .setDescription(`**NearBot** is a multi-purpose bot with features like __starboard__, __leveling system__ and also has __afk__, __moderation__, __music__, __economy__ and etc! 

                            Use the **reactions** to flip through NearBot's commands!`)

        const page1 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor('Leveling Commands')
            .addFields(
                {
                    name: 'Setup Commands',
                    value: `Use \`enable-leveling\` to **enable** NearBot's leveling feature.
                Use \`disable-leveling\` to **disable** NearBot's leveling feature.
                Use \`setannounce\` to set the **level up channel**.
                Use \`removeannounce\` to reset the **level up channel**.`,
                },
                {
                    name: 'General Commands',
                    value: `Use \`level\` to check **your level**.
                        Use \`leaderboard\` to check the server's **leaderboard**.`
                },
                {
                    name: 'Moderator Commands',
                    value: `Use \`givelevel\` to **add levels**.
                        Use \`removelevel\` to **remove levels**.
                        Use \`resetlevels\` to **reset everyone's levels**.`
                }
            )

        const page2 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor('Starboard Commands')
            .addField(`Setup Commands`,
                `Use \`starboard-channel\` to set the **starboard channel**.
                       Use \`starboard-min\` to set **minimum reactions** required for a message to be on the starboard.
                       Use \`starboard-disable\` to **disable** NearBot's starboard feature.`)

        const page3 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor('Misc Commands')
            .addFields(
                {
                    name: 'Discord Info Commands',
                    value: `Use \`userinfo\` to fetch a **user's information**.
                            Use \`serverinfo\` to fetch the **server's information**.
                            Use \`spotify\` to fetch a user's **Spotify information**.
                            Use \`avatar\` to fetch a user's **display avatar**.
                            Use \`membercount\` to fetch **member count** of a server.`
                },
                {
                    name: 'API Info Commands',
                    value: `Use \`weather\` to fetch **weather and temperature** (C) of a location.
                            Use \`urbandictionary\` to fetch definitions from **Urban Dictionary**. (Results might be NSFW.)
                            Use \`youtube-search\` to fetch a video from **YouTube**.`
                }
            )

        const page4 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .addFields(
                {
                    name: 'Admin-Only Commands',
                    value: `<:spacer:907723859258667038>
                            Use \`setprefix\` to **set a prefix** for this guild.
                            Use \`resetprefix\` to **reset the prefix** for this guild.
                            Use \`setmuterole\` to setup a **mute role** for this guild.
                            Use \`resetmuterole\` to reset a **mute role** for this guild.
                            Use \`setupmuteperms\` to **setup permissions** for the mute role.`
                }
            )

        const page5 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .addFields(
                {
                    name: 'Moderation Commands',
                    value: `<:spacer:907723859258667038>
                            Use \`ban\` to **ban** someone from the guild.
                            Use \`unban\` to **unban** banned users from the guild.
                            Use \`kick\` to **kick** someone from the guild.
                            Use \`mute\` to **mute** someone in the guild.
                            Use \`unmute\` to **unmute** someone in the guild.
                            Use \`lock\` to **lock** a channel.
                            Use \`unlock\` to **unlock** a channel.
                            Use \`purge\` to **delete** messages.
                            Use \`slowmode\` to set **slowmode** in a channel.`
                }
            )

        const pages = [
            pagemain,
            page1,
            page2,
            page3,
            page4,
            page5
        ]

        pagination(message, pages, emojis, timeout)

    }
}
