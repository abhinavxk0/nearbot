const DisTube = require('distube');
const { embedcolor, errorcolor } = require('../../config.json')

module.exports = {
    name: 'play',
    aliases: ['p', 'pl'],
    cooldown: 15,
    category: "music",
    description: 'plays music',
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')                                                                                
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        if (!message.guild.me.hasPermission("CONNECT")) return message.reply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I connect to this channel, I am lacking the \`CONNECT\` permission!`)
        )
        if (!message.guild.me.hasPermission("SPEAK")) return message.reply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I cannot play music in this channel, I am lacking the \`SPEAK\` permission!`)
        )   
           

        const query = args.join(" ");

        if (!query) {
            return message.reply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Enter a song URL or query to play!')
            ).then(message => { message.delete({ timeout: 10000 }); })
        }

        const a = await message.reply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )
        client.distube.play(message, query).then(
            a.delete()
        ).catch((err) => {
            console.log(err)
            throw err;
        })
        try {
            message.delete()
        }catch (err){
            throw err;
        }
    }
}

