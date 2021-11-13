const { embedcolor } = require('../../config.json')
module.exports = {
    name: 'unban',
    async execute(client, message, args, Discord){
        var input = args[0];
        var reason = args.slice(1).join(" ") || 'No reason.';
        var fetchedBans = await message.guild.fetchBans();

        if (!fetchedBans.find((user) => user.user.id == input)){
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription(`\`${input}\` is not banned or does not exist.`)
            )
            return;
        }
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`BAN_MEMBERS\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`BAN_MEMBERS\` permission.`)
        )  

        message.guild.members.unban(input, reason)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setAuthor(`Unbanned by ${message.author.tag}`, message.author.displayAvatarURL(
                    {
                        dynamic: true
                    }
                ))
                .setDescription(`<@${input}> has been unbanned.`)
                .setTimestamp()
        )
    }
}