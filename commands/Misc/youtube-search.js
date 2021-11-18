const ytsr = require('ytsr')

module.exports = {
    name: 'youtube-search',
    aliases: ['youtube-s', 'yts', 'yt'],
    async execute(client, message, args, Discord){
        let msg = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Loading <a:loading:910721336542916660>')
        )

        const query = args.join(" ");

        if (!query) return msg.edit("Please provide a search query!");

        const res = await ytsr(query).catch(e => {
            return msg.edit("No results were found!")
        })
        const video = res.items.filter(i => i.type === 'video')[0]
        if (!video) return msg.edit("No results were found!")


        return msg.edit(video.url)
    }
}