module.exports = {
    name: 'purge',
    aliases: ['sweep', 'delete', 'clear'],
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_MESSAGES\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`MANAGE_MESSAGES\` permission.`)
        )
        if (!args[0]) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Enter a number of messages to be purged.')
        )
        if (isNaN(args[0])) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The number of messages to be purged should be a number.')
        )
        if (parseInt(args[0]) > 99) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('The number of messages to be purged should be under 100.')
        )
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch((err) => console.log(err)).then(
                message.channel.send(
                    new Discord.MessageEmbed()
                        .setColor('#A9E9F6')
                        .setDescription(`Purged **${args[0]}** messages.`)
                )
            )

    }
}