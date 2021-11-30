const os = require('os');
const moment = require('moment')
const { utc } = require('moment');

module.exports = {
    name: 'stats',
    aliases: ['botinfo', 'bot', 'info'],
    async execute(client, message, args, Discord) {
        const core = os.cpus()[0]
        const clientCreated = utc(client.user.createdTimesstamp).format("Do MMMM YYYY");
        const servers = client.guilds.cache.size.toLocaleString();
        const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
        const channels = client.channels.cache.size.toLocaleString();
        let uptime = moment.duration(client.uptime);
            sec = uptime.seconds() == 1 ? `${uptime.seconds()} seconds` : `${uptime.seconds()} seconds`;
            min = uptime.minutes() == 1 ? `${uptime.minutes()} minutes` : `${uptime.minutes()} minutes`;
            hr = uptime.hours() == 1 ? `${uptime.hours()} hours` : `${uptime.hours()} hours`;
            days = uptime.days() == 1 ? `${uptime.days()} days` : `${uptime.days()} days`;

        const member = message.guild.members.cache.get(client.user.id);
        const rawColor = member.displayHexColor;
        let hexColor = `#${rawColor.slice(1).trim().split(/ +/g)}`;
        if (hexColor == '#000000'){
            hexColor = '#A9E9F6'
        }
        let m = await message.lineReply(
            new Discord.MessageEmbed()
                .setAuthor("Stats 📊", client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(hexColor)
                .setDescription(`[\`Invite Nearbot\`](${`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.gg%2F3h5ajxffkw&response_type=code&scope=bot%20guilds.join`})  ·  [\`Support Server\`](https://discord.gg/3h5ajxffkw)  ·  [\`Bot Developer\`](https://discords.com/bio/p/xaviervv)`)
                .addFields(
                    {
                        name: 'Ping',
                        value: `\`WS Ping: ${Math.round(client.ws.ping)}ms \n Message Ping: _Pinging..._\``
                    },
                    {
                        name: 'Server Count',
                        value: `\`${servers} servers\``,
                        inline: true,
                    },
                    {
                        name: `User Count`,
                        value: `\`${users} users\``,
                        inline: true,
                    },
                    {
                        name: 'Channel Count',
                        value: `\`${channels} channels\``
                    },
                    {
                        name: 'Bot Info',
                        value: `\`Tag: ${client.user.tag} \n ID: ${client.user.id} \n Commands: ${client.commands.size} commands \n Created on: ${clientCreated}\``,
                        inline: true,
                    },
                    {
                        name: 'CPU Info',
                        value: `\`CPU Model: ${core.model} \n CPU Cores: ${os.cpus().length} \n CPU Speed: ${core.speed / 1000} GHz\``,
                        inline: true,
                    },
                    {
                        name: 'Uptime',
                        value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                        inline: true,
                    },
                )
                .setFooter(`NearBot v1`)
        )
        const msgPing = m.createdTimestamp - message.createdTimestamp;

        m.edit(
            new Discord.MessageEmbed()
                .setAuthor("Stats 📊", client.user.displayAvatarURL())
                .setColor(hexColor)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`[\`Invite Nearbot\`](${`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.gg%2F3h5ajxffkw&response_type=code&scope=bot%20guilds.join`})  ·  [\`Support Server\`](https://discord.gg/3h5ajxffkw)  ·  [\`Bot Developer\`](https://discords.com/bio/p/xaviervv)`)
                .addFields(
                    {
                        name: 'Ping',
                        value: `\`WS Ping: ${Math.round(client.ws.ping)}ms \n Message Ping: ${msgPing}ms\``
                    },
                    {
                        name: 'Server Count',
                        value: `\`${servers} servers\``,
                        inline: true,
                    },
                    {
                        name: `User Count`,
                        value: `\`${users} users\``,
                        inline: true,
                    },
                    {
                        name: 'Channel Count',
                        value: `\`${channels} channels\``
                    },
                    {
                        name: 'Bot Info',
                        value: `\`Tag: ${client.user.tag} \n ID: ${client.user.id} \n Commands: ${client.commands.size} commands \n Created on: ${clientCreated}\``,
                        inline: true,
                    },
                    {
                        name: 'CPU Info',
                        value: `\`CPU Model: ${core.model} \n CPU Cores: ${os.cpus().length} \n CPU Speed: ${core.speed / 1000} GHz\``,
                        inline: true,
                    },
                    {
                        name: 'Uptime',
                        value: `\`${days}, ${hr}, ${min} and ${sec}\``,
                        inline: true,
                    },
                )
                .setFooter(`NearBot v1`)
        )

    }
}