
const config = require('../../config.json');
const convert = require('parse-ms')
const Genius = require('genius-lyrics');
const fetcher = new Genius.Client(config.geniusaccess);
const pag = require('discord.js-pagination');

module.exports = {
    name: 'spotify',
    aliases: ['sp'],
    async execute(client, message, args, Discord) {
        let user = message.mentions.users.first() || message.author;

        let status;
        if (user.presence.activities.length === 1) {
            status = user.presence.activities[0];
        } else if (user.presence.activities.length > 1) {
            status = user.presence.activities[1];
        }

        if (user.presence.activities.length === 0 || status.name !== 'Spotify' && status.type !== "LISTENING") {
            return message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`**${user.tag}** is not listening to Spotify`)
                    .setTimestamp()
            )
        }

        if (status !== null && status.type === "LISTENING" && status.name === 'Spotify' && status.assets !== null) {

            let albumArt = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                songURL = `https://open.spotify.com/track/${status.syncID}`,
                songName = status.details,
                songArtist = status.state,
                albumName = status.assets.largeText,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeConvert = convert(timeEnd - timeStart),
                spotifyLogo = 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png';

            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`;

            const mainEmbed = new Discord.MessageEmbed()
                .setColor('0x1ED768')
                .setAuthor('Listening to Spotify', spotifyLogo)
                .setThumbnail(albumArt)
                .setTitle(songName)
                .setDescription(`by ${songArtist}\non ${albumName}\n- **${time}**\n[\`Listen now on Spotify!\`](${songURL})`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

            const errorEmbed = new Discord.MessageEmbed()
                .setColor('0x1ED768')
                .setAuthor('Listening to Spotify', spotifyLogo)
                .setThumbnail(albumArt)
                .setTitle(songName)
                .setDescription(`by ${songArtist}\non ${albumName}\n- **${time}**\n[\`Listen now on Spotify!\`](${songURL})`)
                .setFooter(`${message.author.tag} | Error while fetching lyrics.`, message.author.displayAvatarURL({ dynamic: true }))

            if (args[0].toLowerCase === '-l' || '-lyrics') {
                return message.lineReplyNoMention(mainEmbed)
            } else if (args[1].toLowerCase === '-l' || '-lyrics') {
                return message.lineReplyNoMention(mainEmbed)
            }


            let splitto;
            if (songArtist.includes(';')) {
                let artis = songArtist.split(';');
                splitto = artis[0];
            } else {
                splitto = songArtist
            };

            const res = await fetcher.songs.search(`${songName}, ${splitto}`, { sanitizeQuery: true });
            const firstSong = res[0];

            let lyrics;
            try {
                lyrics = await firstSong.lyrics();
            } catch (err) {
                return message.lineReplyNoMention(errorEmbed);
            };

            const titleLower = firstSong.fullTitle.toLowerCase;
            const nameLower = songName.toLowerCase;

            if (!titleLower.includes(nameLower)) {
                return message.lineReplyNoMention(errorEmbed);
            };

            const lyricsLength = lyrics.length;
            const lyricsEmbedAuthor = `${songName} - ${songArtist}`

            if (lyricsLength <= 2000) {
                const embed = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setTitle('Lyrics')
                    .setURL(firstSong.url)
                    .setDescription(lyrics);

                pag(message, [mainEmbed, embed], ['⬅️', '➡️'], 300000);
            } else if (lyricsLength <= 4000) {
                let lyricsSliceOne = lyrics.slice(0, 2000);
                let lyricsSliceTwo = lyrics.slice(2000, lyricsLength);

                const embed = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setTitle('Lyrics')
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceOne);

                const embedOne = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceTwo);

                pag(message, [mainEmbed, embed, embedOne], ['⬅️', '➡️'], 300000);
            } else if (lyricsLength <= 6000) {
                let lyricsSliceOne = lyrics.slice(0, 2000);
                let lyricsSliceTwo = lyrics.slice(2000, 4000)
                let lyricsSliceThree = lyrics.slice(4000, lyricsLength)

                const embed = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setTitle('Lyrics')
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceOne);

                const embedOne = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceTwo);

                const embedTwo = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceThree);

                pag(message, [mainEmbed, embed, embedOne, embedTwo], ['⬅️', '➡️'], 300000);
            } else if (lyricsLength <= 8000) {
                let lyricsSliceOne = lyrics.slice(0, 2000);
                let lyricsSliceTwo = lyrics.slice(2000, 4000)
                let lyricsSliceThree = lyrics.slice(4000, 6000)
                let lyricsSliceFour = lyrics.slice(6000, lyricsLength)

                const embed = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setTitle('Lyrics')
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceOne);

                const embedOne = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceTwo);

                const embedTwo = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceThree);

                const embedThree = new Discord.MessageEmbed()
                    .setColor('0x1ED768')
                    .setAuthor(lyricsEmbedAuthor, spotifyLogo)
                    .setURL(firstSong.url)
                    .setDescription(lyricsSliceFour);

                pag(message, [mainEmbed, embed, embedOne, embedTwo, embedThree], ['⬅️', '➡️'], 300000);
            } else {
                message.lineReplyNoMention(
                    new Discord.MessageEmbed()
                        .setColor('0x1ED768')
                        .setAuthor('Listening to Spotify', spotifyLogo)
                        .setThumbnail(albumArt)
                        .setTitle(songName)
                        .setDescription(`by ${songArtist}\non ${albumName}\n- **${time}**\n[\`Listen now on Spotify!\`](${songURL})`)
                        .setFooter(`${message.author.tag} | Lyrics are too long.`, message.author.displayAvatarURL({ dynamic: true }))
                )
            }
        }
    }
}