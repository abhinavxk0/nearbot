const pagination = require('discord.js-pagination')
const config = require('../../config.json')
const db = require('quick.db')
module.exports = {
    name: 'help',
    aliases: ['commands', 'cmds'],
    async execute(client, message, args, Discord) {
        const emojis = [
            "⬅️", "➡️"
        ]
        const timeout = '100000';
        const prefixdb = await db.fetch(`prefix.${message.guild.id}`)
        const pagemain = new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setAuthor(`Help for NearBot`, client.user.avatarURL({ dynamic: true }))
            .setDescription(`\n\`Prefix: "${prefixdb}"\`
\n[\`Invite Nearbot\`](${`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`})  ·  [\`Support Server\`](https://discord.gg/3h5ajxffkw)  ·  [\`Bot Developer\`](https://discords.com/bio/p/xaviervv)`)
        const page1 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setAuthor('Leveling Commands')
            .addFields(
                {
                    name: 'Setup Commands',
                    value: `>>> Use \`enable-leveling\` to **enable** NearBot's leveling feature.\n
Use \`disable-leveling\` to **disable** NearBot's leveling feature.\n
Use \`setannounce\` to set the **level up channel**.\n
Use \`removeannounce\` to reset the **level up channel**.`,
                },
                {
                    name: 'General Commands',
                    value: `>>> Use \`level\` to check **your level**.\n
Use \`leaderboard\` to check the server's **leaderboard**.`
                },
                {
                    name: 'Moderator Commands',
                    value: `>>> Use \`givelevel\` to **add levels**.\n
Use \`removelevel\` to **remove levels**.\n
Use \`resetlevels\` to **reset everyone's levels**.`
                }
            )

        const page2 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setAuthor('Starboard Commands')
            .addField(`Setup Commands`,
                `>>> Use \`starboard-channel\` to set the **starboard channel**.\n
Use \`starboard-min\` to set **minimum reactions** required for a message to be on the starboard.\n
Use \`starboard-disable\` to **disable** NearBot's starboard feature.`)

        const page3 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor('Misc Commands')
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Discord Info Commands',
                    value: `>>> Use \`userinfo\` to fetch a **user's information**.\n
Use \`serverinfo\` to fetch the **server's information**.\n
Use \`spotify\` to fetch a user's **Spotify information**.\n
Use \`avatar\` to fetch a user's **display avatar**.\n
Use \`membercount\` to fetch **member count** of a server.`
                },
                {
                    name: 'API Info Commands',
                    value: `>>> Use \`weather\` to fetch **weather and temperature** (C) of a location.\n
Use \`urbandictionary\` to fetch definitions from **Urban Dictionary**. (Results might be NSFW.)\n
Use \`youtube-search\` to fetch a video from **YouTube**.`
                }
            )

        const page4 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Admin-Only Commands',
                    value: `>>> Use \`setprefix\` to **set a prefix** for this guild.\n
Use \`resetprefix\` to **reset the prefix** for this guild.\n
Use \`setmuterole\` to set a **mute role** for this guild.\n
Use \`resetmuterole\` to reset a **mute role** for this guild.\n
Use \`setupmuteperms\` to **setup permissions** for the mute role.\n
Use \`setdjrole\` to set a **DJ role** for this guild.\n
Use \`resetdjrole\` to reset the **DJ role** for this guild.`
                }
            )

        const page5 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                {
                    name: 'Moderation Commands',
                    value: `>>> Use \`ban\` to **ban** someone from the guild.\n
Use \`unban\` to **unban** banned users from the guild.\n
Use \`kick\` to **kick** someone from the guild.\n
Use \`mute\` to **mute** someone in the guild.\n
Use \`unmute\` to **unmute** someone in the guild.\n
Use \`lock\` to **lock** a channel.\n
Use \`unlock\` to **unlock** a channel.\n
Use \`purge\` to **delete** messages.\n
Use \`slowmode\` to set **slowmode** in a channel.\n
Use \`drag\` to **drag** a user to a voice channel!`
                }
            )

        const page6 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addField(`Music Commands`,
                `>>> Use \`play\` to play music. (supports Spotify and Soundcloud!!)\n
Use \`nowplaying\` to check what's playing in the queue right now!\n
Use \`queue\` to check the guild queue.\n
Use \`lyrics\` to fetch lyrics for any song.\n`, true)
            .addField('DJ Only Commands',
                `>>> Use \`skip\` to skip the current track.\n
Use \`stop\` to stop the current music session.\n
Use \`pause\` to pause the current track.\n
Use \`resume\` to resume the current paused track.\n
Use \`loop\` to loop the current track or queue or turn it off.\n
Use \`shuffle\` to shuffle the current queue.\n
Use \`skipto\` to skip to a track in the queue.\n
Use \`volume\` to adjust the queue's volume.\n
Use \`transferdj\` to transfer the DJ to another person.\n
Use \`autoplay\` to toggle autoplay.
`, true)

        const page7 = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addField(`Economy Commands`,
                `>>> Use \`balance\` to check your **balance**!\n
Use \`coinflip\` to **bet an amount** to double or nothing!\n
Use \`daily\` to collect your **daily reward**!\n
Use \`give\` to **give an amount** to someone else!\n
Use \`rich\` to check the **rankings**!\n
Use \`work\` to **work** and earn money!`)

        const pages = [pagemain, page6, page1, page2, page3, page4, page5, page7]

        pagination(message, pages, emojis, timeout)

    }
}
