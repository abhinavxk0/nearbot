const { embedcolor, errorcolor } = require('../../config.json')

module.exports = {
    name: 'set-nick',
    aliases: ['nick', 'setnick', 'nickname'],
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() || client.users.fetch(args[0])
        const arguments = args.slice(1).join(" ");


        // Permissions Checking
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


        // Input Checking
        if (!member) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription('Specify a member.')
        );
        if (!arguments) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor(errorcolor)
                .setDescription('Specify a nickname.')
        );


        // Execution of Task
        try {
            const memberTarget = message.guild.members.cache.get(member.id)
            memberTarget.setNickname(arguments);
            message.react("<:tick:912211898160779284>")
        } catch (err) {
            throw err;
        }


    }
}


