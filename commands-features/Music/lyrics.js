
const Genius = require("genius-lyrics");
const pag = require('discord.js-pagination')
const config = require('../../config.json')

module.exports = {
    name: 'lyrics',
    description: 'Get lyrics.',
    async execute(client, message, args, Discord) {
        const queue = await client.distube.getQueue(message);

        let query = args.join(" ")
        if (!query) {
            if (queue) {
                const song = client.distube.getQueue(message).songs[0]
                query = song.name

            } else {
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor('#ffff64')
                        .setTimestamp()
                        .setDescription(`you need lyrics? np! just enter a query!`)
                )
                return;
            }
        }
        const fetchgenius = new Genius.Client(config.geniusaccess);
        try {
            var searches = await fetchgenius.songs.search(query)
            var firstSong = searches[0];
            var lyrics;
            try {
                lyrics = await firstSong.lyrics();
            } catch (err) {
                message.lineReply(`Couldn't find lyrics for this song!`)
                return;
            }
            var lyricsLength = lyrics.length;
        } catch (err) {
            return message.lineReply(`There was an error executing this command!`)

        }

        const loading = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setDescription(`loading <a:loading:910721336542916660>`)
        )
        const main = new Discord.MessageEmbed()
            .setColor('#ffff64')
            .setAuthor(`by ${firstSong.artist.name}`)
            .setThumbnail(firstSong.image)
            .setTitle(firstSong.title)
            .setDescription(`\n\n\n[\`Open in Browser\`](${firstSong.url})`)

        if (lyricsLength < 2000) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(`${lyrics}\n\n[\`Open in Browser\`](${firstSong.url})`)
            message.lineReplyNoMention(embed);
        } else if (lyricsLength > 2000 && lyricsLength <= 4000) {
            const firstSlice = lyrics.slice(0, 2000);
            const secondSlice = lyrics.slice(2000, lyricsLength);

            const embedFirst = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(firstSlice)

            const embedSecond = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(secondSlice)

            pag(message, [main, embedFirst, embedSecond], ['⬅️', '➡️'], 300000)
        } else if (lyricsLength > 4000 && lyricsLength <= 6000) {
            const firstSlice = lyrics.slice(0, 2000);
            const secondSlice = lyrics.slice(2000, 4000);
            const thirdSlice = lyrics.slice(4000, lyricsLength)

            const embedFirst = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(firstSlice)

            const embedSecond = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(secondSlice)

            const embedThird = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(thirdSlice)

            pag(message, [main, embedFirst, embedSecond, embedThird], ['⬅️', '➡️'], 300000)
        } else if (lyricsLength > 6000 && lyricsLength <= 8000) {
            const firstSlice = lyrics.slice(0, 2000);
            const secondSlice = lyrics.slice(2000, 4000);
            const thirdSlice = lyrics.slice(4000, 6000);
            const fourthSlice = lyrics.slice(6000, lyricsLength)

            const embedFirst = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(firstSlice)

            const embedSecond = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(secondSlice)

            const embedThird = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(thirdSlice)

            const embedFourth = new Discord.MessageEmbed()
                .setColor('#ffff64')
                .setAuthor(`by ${firstSong.artist.name}`)
                .setTitle(firstSong.title)
                .setThumbnail(firstSong.image)
                .setDescription(fourthSlice)

            pag(message, [main, embedFirst, embedSecond, embedThird, embedFourth], ['⬅️', '➡️'], 300000)
        } else {
            message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`Aw the lyrics are too long, but you can check them out [here](${firstSong.url})!`)
            )
        }
    }
}