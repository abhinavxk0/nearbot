const pagination = require('discord.js-pagination');
const moment = require('moment');
const convert = require('parse-ms');

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'uinfo', 'whois'],
    execute(client, message, args, Discord) {
        const user = message.mentions.users.first() || message.author;
        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Enter a valid user.`)
        )
        const member = message.guild.member(user.id);
        const rawColor = member.displayHexColor;
        let hexColor = `#${rawColor.slice(1).trim().split(/ +/g)}`;
        if (hexColor == '#000000'){
            hexColor = '#A9E9F6'
        }
        let badgeEmojis = {
            HOUSE_BRAVERY: "<:bravery:906595038019088395> Bravery",
            HOUSE_BRILLIANCE: "<:brilliance:906594770841903104> Brilliance",
            HOUSE_BALANCE: "<:balance:906594831873232897> Balance"
        };
        let badge = user.flags.toArray().map( flag => badgeEmojis[flag] );
        let statuses = {
            online: "<:online:906596178454528111> Online",
            idle: "<:Idle:906596249355034644> Idle",
            dnd: "<:dnd:906596319584485387> DND",
            offline: "<:offline:906596384118038568> Offline"
        };
        const rawDevice = user.presence?.clientStatus || {};
        let device = Object.entries(rawDevice).map(
            (value) => `${value[0]}`
        );
        if (user.presence.status == 'offline'){
            device = 'offline'
        }
        let status;
        if (user.presence.activities.length === 1) {
            status = user.presence.activities[0]
        } else if (user.presence.activities.length > 1) {
            status = user.presence.activities[1]
        }
        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(hexColor)
                    .setAuthor(`${user.tag}`, user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        {
                            name: '__User Identity__',
                            value: `**ID**: ${user.id}
**Created**: ${moment(user.createdTimestamp).format("LLL")}; ${moment(user.createdTimestamp).fromNow()}
**Avatar**: [Click Here](${user.displayAvatarURL({ dynamic: true })})
**Badges**: ${badge}`,
                            inline: true,
                        },
                        {
                            name: '__Presence__',
                            value: `**Status**: ${statuses[user.presence.status]}
**Device**: ${device}`,
                            inline: true,
                        },
                        {
                            name: '__Server Member Info__',
                            value: `**Nickname**: ${member.nickname || "None"}
**Role Count**: ${member.roles.cache.size - 1}
**Joined on**: ${moment(member.joinedTimestamp).format("LLL")}`,
                            inline: true,
                        },
                    )
            )
        }
        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = `https://open.spotify.com/track/${status.syncID}`,
                name = status.details,
                artist = status.state,
                album = status.assets.largeText,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeConvert = convert(timeEnd - timeStart);
            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`

            const mainEmbed = new Discord.MessageEmbed()
                .setColor(hexColor)
                .setAuthor(`${user.tag}`, user.displayAvatarURL({
                    dynamic: true
                }))
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: '__User Identity__',
                        value: `**ID**: ${user.id}
**Created**: ${moment(user.createdTimestamp).format("LLL")}
**Avatar**: [Click Here](${user.displayAvatarURL({ dynamic: true })})
 **Badges**: ${badge}`,
                        inline: true,
                    },
                    {
                        name: '__Presence__',
                        value: `**Status**: ${statuses[user.presence.status]}
**Device**: ${device}`,
                        inline: true,
                    },
                    {
                        name: '__Server Member Info__',
                        value: `**Nickname**: ${member.nickname || "None"}
**Role Count**: ${member.roles.cache.size - 1}
**Joined on**: ${moment(user.joinedTimestamp).format("LLL")}`,
                        inline: true,
                    },
                )
                const spotifyEmbed = new Discord.MessageEmbed()
                .setColor('0x1ED768')
                .setAuthor(`Listening to Spotify`, 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')
                .setThumbnail(image)
                .setTitle(name)
                .setDescription(`by ${artist}\non ${album}\n- **${time}**`)
                .addField('Listen now on Spotify!', `[\`${artist} - ${name}\`](${url})`, false)
                .setFooter(message.author.tag, message.author.displayAvatarURL({
                    dynamic : true
                }))
            const pages = [ mainEmbed, spotifyEmbed ];
            const emojis = ["⬅️", "➡️"];
            const timeout = '100000';

            pagination(message, pages, emojis, timeout)
        }
    }
}