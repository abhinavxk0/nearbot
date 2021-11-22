const { embedcolor, errorcolor } = require('../../config.json')

module.exports = {
    name: 'reset-nick',
    aliases: ['renick', 'resetnick', 'resetnickname'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_NICKNAMES\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`MANAGE_NICKNAMES\` permission.`)
        )  

        const member = message.mentions.members.first() || client.users.fetch(args[0])
        if (!member) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription('Specify a member.')
        );
        try {
            const memberTarget = message.guild.members.cache.get(member.id)
            memberTarget.setNickname(null);
            message.react("<:tick:912211898160779284>")
        } catch (err) {
            throw err;
        }
}}