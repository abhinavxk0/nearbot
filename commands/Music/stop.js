module.exports = {
    name: 'stop',
    category: "music",
    description: 'stops music',
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
            const djRole = await db.fetch(`djrole.${queue.textChannel.guild.id}`)
            if (song.user.roles.cache.has(djRole)) {
              song.user.roles.remove(djRole)
            } else return;
        } else if (!queue) {
            return
        };
    }
}

