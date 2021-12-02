const Genius = require("genius-lyrics");
const pagination = require('discord.js-pagination')
const { geniusaccess, embedcolor } = require('../../config.json')
const emojis = [
    "⬅️", "➡️"
]
const timeout = '300000';

module.exports = {
    name: 'lyrics',
    async execute(client, message, args, Discord) {
        const queue = await client.distube.getQueue(message);
        
        let query = args.join(" ")
        if (!query) {
            if (queue){
                const song = client.distube.getQueue(message).songs[0]
                query = song.name
                
            } else {
                message.lineReply(
                    new Discord.MessageEmbed()
                        .setColor(embedcolor)
                        .setDescription(`you need lyrics? np! just enter a query!`)
                )
                return;
            }
        }
        const fetchgenius = new Genius.Client(geniusaccess);
        try {
            var searches = await fetchgenius.songs.search(query)
            var firstSong = searches[0];
            var lyrics;
            try {
                lyrics = await firstSong.lyrics();
            } catch(err){
                message.lineReply(`Couldn't find lyrics for this song!`)
                return;
            }
            var lyricsLength = lyrics.length;
        } catch (err){
            return message.lineReply(`There was an error executing this command!`)

        }
        
        const a = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )
        const main = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setThumbnail(firstSong.image)
            .setTitle(firstSong.title)
            .setURL(firstSong.url)
            .setDescription(`by [${firstSong.artist.name}](${firstSong.artist.url})`)
            // .setDescription(`[**${firstSong.fullTitle}**](${firstSong.url})`)


        if (lyricsLength < 2000) {
            let under2000 = new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setTitle('lyrics')
                .setDescription(lyrics)
            let pagesone = [main, under2000]
            pagination(message, pagesone, emojis, timeout)
                try {
                    a.delete()
                } catch (err) {
                    throw err;
                }
            
        } else if (lyricsLength <= 4000) {
            let l1 = lyrics.slice(0, 2000)
            let l2 = lyrics.slice(2000, lyricsLength)
            let l1em = new Discord.MessageEmbed()
            .setTitle('lyrics')
            .setColor(embedcolor)
            .setDescription(l1)
            let l2em = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(l2)
            let pagestwo = [main, l1em, l2em]
            pagination(message, pagestwo, emojis, timeout)        
            try {
                a.delete()
            } catch (err) {
                throw err;
            }
        } else if (lyricsLength <= 4000) {
            let ly1 = lyrics.slice(0, 2000)
            let ly2 = lyrics.slice(2000, 4000)
            let ly3 = lyrics.slice(4000, lyricsLength)

            let ly1em = new Discord.MessageEmbed()
            .setTitle('lyrics')
            .setColor(embedcolor)
            .setDescription(ly1)
            let ly2em = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(ly2)
            let ly3em =new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(ly3)

            let pagesthree = [main, ly1em, ly2em, ly3em]
            pagination(message, pagesthree, emojis, timeout)
            try {
                a.delete()
            } catch (err) {
                throw err;
            }
        } else if (lyricsLength <= 5000) {
            let li1 = lyrics.slice(0, 2000)
            let li2 = lyrics.slice(2000, 4000)
            let li3 = lyrics.slice(4000, lyricsLength)

            let li1em = new Discord.MessageEmbed()
            .setTitle('lyrics')
            .setColor(embedcolor)
            .setDescription(li1)
            let li2em = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(li2)
            let li3em = new Discord.MessageEmbed()
            .setColor(embedcolor)
            .setDescription(li3)

            let pagesfour = [main, li1em, li2em, li3em]
            pagination(message, pagesfour, emojis, timeout)
            try {
                a.delete()
            } catch (err) {
                throw err;
            }
        } else if (lyricsLength < 6000){
            let le1 = lyrics.slice(0, 2000)
            let le2 = lyrics.slice(2000, 4000)
            let le3 = lyrics.slice(4000, 5000)
            let le4 = lyrics.slice(5000, lyricsLength)

            let le1e = new Discord.MessageEmbed()
            .setTitle('lyrics')
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
            try {
                a.delete()
            } catch (err) {
                throw err;
            }
        }
        else {
            message.lineReply(`oh no! the lyrics are too long!`)
        }
    }
}