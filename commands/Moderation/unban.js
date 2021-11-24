const config = require('../../config.json')
module.exports = {
    name: 'unban',
    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Ban Members\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Ban Members\` permission.`)
                .setTimestamp()
        )
        var input = args[0];
        var reason = args.slice(1).join(" ") || 'No reason.';
        var fetchedBans = await message.guild.fetchBans();

        if (!input) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · Please enter a valid member to ban.`)
                .setTimestamp()
        )
        if (!fetchedBans.find((user) => user.user.id == input)) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · \`${input}\` is not banned or does not exist.`)
            )
            return;
        }


        try {
            message.guild.members.unban(input, reason)
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`${config.greentick} · <@${input}> has been unbanned.`)
                    .setTimestamp()
            )
        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.errorcolor)
                    .setDescription(`${config.redtick} · There was an error! :/`)
                    .setTimestamp()
            )
        }
    }
}