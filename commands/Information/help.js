const config = require('../../config.json');
const db = require('quick.db')
const pag = require('discord.js-pagination')
module.exports = {
    name: 'help',
    aliases: ['commands', 'cmds'],
    async execute(client, message, args, Discord) {

        const prefixdb = await db.fetch(`prefix.${message.guild.id}`)
        const main = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor('Help Command')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`\`help <category>\``)
            .addField('Prefix:', `\`${prefixdb}\``)
            .addField('Links:', `[\`📩 ·  Invite Nearbot\`](${`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`})\n[\`🎈 ·  Support Server\`](https://discord.gg/3h5ajxffkw)\n[\`👨‍💻 ·  Bot Developer\`](https://discords.com/bio/p/xaviervv)`)
            .setFooter('Use help <category>')
            .setTimestamp()

        const music = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('🎵 ·  Music Commands')
            .setDescription(`
**play**\n${config.replyicon} Play music. (supports Spotify and Soundcloud!!)
**queue**\n${config.replyicon} Shows the current queue.
**nowplaying**\n${config.replyicon} What's playing in the queue right now.
**lyrics**\n${config.replyicon} Finds out lyrics for any song.
**skip**\n${config.replyicon} Skips the current song.
**stop**\n${config.replyicon} Clears the queue and disconnects.
**pause**\n${config.replyicon} Pauses the current song.
**resume**\n${config.replyicon} Resumes the current song.
**loop**\n${config.replyicon} Loops the current song, queue or turns it off.
**shuffle**\n${config.replyicon} Shuffles the current queue.
**jump**\n${config.replyicon} Jumps/skips to another song in the queue.
**volume**\n${config.replyicon} Adjust the volume.
**autoplay**\n${config.replyicon} Toggles autoplay.
**transfer**\n${config.replyicon} Transfers DJ to another user.
`)
            .setTimestamp()
            .setFooter('Music Category')

        const moderation = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('⚒️ ·  Moderation Commands')
            .setDescription(`
**ban**\n${config.replyicon} Bans a member.
**unban**\n${config.replyicon} Unbans a user.
**kick**\n${config.replyicon} Kicks a user.
**mute**\n${config.replyicon} Mutes a member.
**unmute**\n${config.replyicon} Unmutes a member.
**set-nick**\n${config.replyicon} Sets a nickname for a member.
**reset-nick**\n${config.replyicon} Resets a nickname for a member.
**purge**\n${config.replyicon} Deletes an amount of messages.
**lock**\n${config.replyicon} Locks a channel. 
**unlock**\n${config.replyicon} Unlocks a channel.
**slowmode**\n${config.replyicon} Sets a slowmode for a channel.
`)
            .setTimestamp()
            .setFooter('Moderation Category')

        const misc = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('🎨 ·  Misc')
            .setFooter('Misc Category')
            .setDescription(`
**avatar**\n${config.replyicon} Get a member's avatar/profile picture.
**spotify**\n${config.replyicon} Show what you or someone else is listening to and that song's lyrics!
**userinfo**\n${config.replyicon} Gets a member's info.
**serverinfo**\n${config.replyicon} Gets the server's info.
**membercount**\n${config.replyicon} Shows the member count of the server.
**weather**\n${config.replyicon} Finds out the weather for a location.
**urbandictionary**\n${config.replyicon} Gets the Urban Dictionary definition of a word or phrase.
**youtube-search**\n${config.replyicon} Searches for a YouTube video.
`)
        const manage = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('🔨 ·  Management')
            .setFooter('Management Category')
            .setDescription(`
**setprefix**\n${config.replyicon} Set a custom prefix for this server.
**setmuterole**\n${config.replyicon} Set a mute role.
**setdjrole**\n${config.replyicon} Set a DJ role.
**setupmuteperms**\n${config.replyicon} Set mute permissions in all channels.
**resetdjrole**\n${config.replyicon} Reset the DJ role.
**resetmuterole**\n${config.replyicon} Reset the mute role.
**resetprefix**\n${config.replyicon} Reset the custom prefix.
**settings**\n${config.replyicon} Check out the server's settings.
`)
        const info = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('🔨 ·  Information')
            .setFooter('Information Category')
            .setDescription(`
**ping**\n${config.replyicon} Check NearBot's ping. 
**uptime**\n${config.replyicon} Check how long NearBot has been up for.
**help**\n${config.replyicon} All commands.
**message**\n${config.replyicon} Last message from developers.
`)
        const level = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('📈 ·  Leveling System')
            .setFooter('Leveling Category')
            .setDescription(`
**level**\n${config.replyicon} Shows yours or someone elses level card.
**leaderboard**\n${config.replyicon} The level leaderboard for this server.
**givelevel**\n${config.replyicon} Give someone an amount of levels.
**removelevel**\n${config.replyicon} Remove an amount of levels.
**setannounce**\n${config.replyicon} Set level-up announcement channel.
**resetannounce**\n${config.replyicon} Reset the level-up announcement channel.
**enable-leveling**\n${config.replyicon} Enable leveling system. 
**disable-leveling**\n${config.replyicon} Disable leveling system.
`)
        const starboard = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('⭐ ·  Starboard System')
            .setFooter('Starboard Category')
            .setDescription(`
**starboard-channel**\n${config.replyicon} Set the starboard channel.
**starboard-min**\n${config.replyicon} Set minimum reactions for starboard.
**starboard-disable**\n${config.replyicon} Disable starboard.
`)
        const eco = new Discord.MessageEmbed()
            .setColor(config.embedcolor)
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor('💵 ·  Economy Category')
            .setFooter('Economy Category')
            .setDescription(`
**balance**\n${config.replyicon} Check your money balance or someone elses.
**rich**\n${config.replyicon} Check richest users in the server.
**crime**\n${config.replyicon} Commit a crime to earn a lot of cash or get fined!
**work**\n${config.replyicon} Work to earn cash!
**daily**\n${config.replyicon} Get your daily rewards!
**coinflip**\n${config.replyicon} Bet an amount to double or nothing it!
**rob**\n${config.replyicon} Rob someone!
**give**\n${config.replyicon} Give someone cash from your balance.
**beg**\n${config.replyicon} Be a beggar and earn some cash.
`)

        if (!args[0]) {
            return pag(message, [main, music, moderation, eco, misc, manage, info, level, starboard], ['⬅️', '➡️'], '300000')
        }
        let category = args[0].toLowerCase();
        switch (category) {
            case 'music':
                message.lineReply(music)
                break;
            case 'songs':
                message.lineReply(music)
                break;
            case 'moderation':
                message.lineReply(moderation)
                break;
            case 'mod':
                message.lineReply(moderation)
                break;
            case 'misc':
                message.lineReply(misc)
                break;
            case 'miscellaneous':
                message.lineReply(misc)
                break;
            case 'man':
                message.lineReply(manage)
                break;
            case 'manage':
                message.lineReply(manage)
                break;
            case 'management':
                message.lineReply(manage)
                break;
            case 'info':
                message.lineReply(info)
                break;
            case 'information':
                message.lineReply(info)
                break;
            case 'level':
                message.lineReply(level)
                break;
            case 'leveling':
                message.lineReply(level)
                break;
            case 'eco':
                message.lineReply(eco)
                break;
            case 'economy':
                message.lineReply(eco)
                break;
            case 'money':
                message.lineReply(eco)
                break;
            default:
                break;
        }


    }
};