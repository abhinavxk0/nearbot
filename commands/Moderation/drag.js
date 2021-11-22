const { embedcolor, errorcolor } = require('../../config.json')

module.exports = {
    name: 'drag',
    aliases: ['pull', 'dr'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`I do not have the \`MANAGE_CHANNELS\` permission.`)
        )
        const target = message.mentions.members.first();
        const channel = message.mentions.channels.first() || message.guild.channels.cache.filter(ch => ch.type === 'voice').find(ch => ch.name === args[1]) || message.member.voice.channel;
        if (!target) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor(errorcolor)
            .setDescription(`enter a user to drag :D`)
        )
        if (!target.voice.channel) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`${target} isn't in a voice channel 🤨`)
        )
        if (!message.member.voice.channel) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription(`u aren't in a voice channel :v`)
        )
        target.voice.setChannel(channel).then(
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setAuthor(`dragged by ${message.author.username}`, message.author.displayAvatarURL({ dynamic : true}))
                    .setDescription(`dragged ${target} to ${channel}`)
            )
        ).catch((err) => {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`there was an error while dragging ${target}! 😦`)
            )
            throw err;
        })
    }
}