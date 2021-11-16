const db = require('quick.db')

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'dc', 'leave'],
    async execute(client, message, args, Discord) {
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

        let queue = await client.distube.getQueue(message);
        if (queue) {
            
            client.distube.stop(message)

            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Disconnected!')
            )
            const djRole = await db.fetch(`djrole.${message.guild.id}`)
            const djUser = await db.fetch(`djuser.${message.guild.id}`)
            const target = message.guild.member(djUser)

            if (target.roles.cache.has(djRole)){
              target.roles.remove(djRole)
            }
        } else if (!queue) {
            return
        };
    }
}

