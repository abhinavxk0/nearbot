const db = require('quick.db')
const { embedcolor } = require('../../config.json')
module.exports = {
    name: 'jump',
    aliases: ['jumpto', 'skipto'],
    async execute(client, message, args, Discord){

        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('I am not currently playing in this guild.')
        ).then(message => { message.delete({ timeout: 10000 }); })

        if (memberVC !== clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You need to be in ${message.guild.me.voice.channel} to execute this command!`)
        ).then(message => { message.delete({ timeout: 10000 }); })
        let queue = client.distube.getQueue(message);

        if (!queue) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The queue is empty!')
        )

        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = await message.guild.member(djUser)
        const djRole = await db.fetch(`djrole.${message.guild.id}`)
        if (djRole){
            if (message.member.id != djUser) return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`you are not the dj for this music session!\n${djmember} is the current dj`)            
            )
        }
        
        if (isNaN(args[0])) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Enter a song number (in the queue) to jump to!')
        ).then(message => { message.delete({ timeout: 10000 }); })

        const a = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )
        
        client.distube.jump(message, parseInt(args[0] - 1)).catch(
            err => message.channel.send("Invalid song number." + err)).then(
                a.delete()
            )
    
    }
}