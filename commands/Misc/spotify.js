const convert = require('parse-ms');
const Genius = require("genius-lyrics");
const pagination = require('discord.js-pagination')
const { geniusaccess } = require('../../config.json')
const embedcolor = '0x1ED768'
const emojis = [
    "⬅️", "➡️"
]
const timeout = '300000';

module.exports = {
    name: 'spotify',
    aliases: ['sp'],
    async execute(client, message, args, Discord) {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if (user.presence.activities.length === 1) status = user.presence.activities[0];
        else if (user.presence.activities.length > 1) status = user.presence.activities[1];

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setDescription(`${user} is not listening to Spotify!`)
                    .setColor('#A9E9F6')
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
            
            let arti;
            if (artist.includes(';')){
                let artis = artist.split(';')
                arti = artis[0]
            } else {
                arti = artist
            }

            const fetchgenius = new Genius.Client(geniusaccess);
            const searches = await fetchgenius.songs.search(`${name}, ${arti}`,{
                sanitizeQuery: true
            });
            const firstSong = searches[0];
            const lyrics = await firstSong.lyrics();
            const lyricsLength = lyrics.length;
            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`

            const main = new Discord.MessageEmbed()
                .setColor('0x1ED768')
                .setAuthor(`Listening to Spotify`, 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')
                .setThumbnail(image)
                .setTitle(name)
                .setDescription(`by ${artist}\non ${album}\n- **${time}**\n
[\`Listen now on Spotify!\`](${url}) - [\`Lyrics\`](${firstSong.url})`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                }))

            if (lyricsLength < 2000) {
                let under2000 = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setAuthor(`${name} - ${arti}`)
                    .setThumbnail(firstSong.image)
                    .setTitle('lyrics')
                    .setURL(firstSong.url)
                    .setDescription(lyrics)
                let pagesone = [main, under2000]
                pagination(message, pagesone, emojis, timeout)
            } else if (lyricsLength <= 4000) {
                let l1 = lyrics.slice(0, 2000)
                let l2 = lyrics.slice(2000, lyricsLength)
                let l1em = new Discord.MessageEmbed()
                    .setTitle('lyrics')
                    .setThumbnail(firstSong.image)
                    .setColor(embedcolor)
                    .setURL(firstSong.url)
                    .setAuthor(`${name} - ${arti}`)
                    .setDescription(l1)
                let l2em = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(l2)
                let pagestwo = [main, l1em, l2em]
                pagination(message, pagestwo, emojis, timeout)
            } else if (lyricsLength <= 4000) {
                let ly1 = lyrics.slice(0, 2000)
                let ly2 = lyrics.slice(2000, 4000)
                let ly3 = lyrics.slice(4000, lyricsLength)

                let ly1em = new Discord.MessageEmbed()
                    .setTitle('lyrics')
                    .setThumbnail(firstSong.image)
                    .setColor(embedcolor)
                    .setURL(firstSong.url)
                    .setAuthor(`${name} - ${arti}`)
                    .setDescription(ly1)
                let ly2em = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(ly2)
                let ly3em = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(ly3)

                let pagesthree = [main, ly1em, ly2em, ly3em]
                pagination(message, pagesthree, emojis, timeout)
            } else if (lyricsLength <= 5000) {
                let li1 = lyrics.slice(0, 2000)
                let li2 = lyrics.slice(2000, 4000)
                let li3 = lyrics.slice(4000, lyricsLength)

                let li1em = new Discord.MessageEmbed()
                    .setTitle('lyrics')
                    .setThumbnail(firstSong.image)
                    .setAuthor(`${name} - ${arti}`)
                    .setColor(embedcolor)
                    .setURL(firstSong.url)
                    .setDescription(li1)
                let li2em = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(li2)
                let li3em = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(li3)

                let pagesfour = [main, li1em, li2em, li3em]
                pagination(message, pagesfour, emojis, timeout)
            } else if (lyricsLength < 6000) {
                let le1 = lyrics.slice(0, 2000)
                let le2 = lyrics.slice(2000, 4000)
                let le3 = lyrics.slice(4000, 5000)
                let le4 = lyrics.slice(5000, lyricsLength)

                let le1e = new Discord.MessageEmbed()
                    .setTitle('lyrics')
                    .setThumbnail(firstSong.image)
                    .setAuthor(`${name} - ${arti}`)
                    .setURL(firstSong.url)
                    .setColor(embedcolor)
                    .setDescription(le1)
                let le2e = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(le2)
                let le3e = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(le3)
                let le4e = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(le4)

                let pagesfive = [main, le1e, le2e, le3e, le4e]
                pagination(message, pagesfive, emojis, timeout)
            }
            else {
                let la1a = new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`oh no! the lyrics are too long! but you can check it out [here](${firstSong.url})`)
                let pagessix = [main, la1a]
                pagination(message, pagessix, emojis, timeout)
            }

        }
    }
}