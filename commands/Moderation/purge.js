const config = require('../../config.json')

module.exports = {
    name: 'purge',
    aliases: ['sweep', 'delete', 'clear'],
    async execute(client, message, args, Discord) {
        let int = args[0];
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · You lack \`Manage Messages\` permission.`)
                .setTimestamp()
        )
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · I lack \`Manage Messages\` permission.`)
                .setTimestamp()
        )
        if (!int) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · Please enter a number of messages to delete.`)
                .setTimestamp()
        )
        if (isNaN(int)) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription(`${config.redtick} · Please enter a **number** of messages to delete.`)
                .setTimestamp()
        )
        if (int > 100){
            int = 100;
        }
        try {
            message.delete()
            const fetch = await message.channel.messages.fetch({ limit: parseInt(int) });
            await message.channel.bulkDelete(fetch, true);
            const a = await message.channel.send(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`Purged **${int}** messages.`)
                    .setTimestamp()
            )
            setTimeout(() => {
                try {
                    a.delete()
                } catch( err){
                    throw err;
                }
            }, 10 * 1000);
        } catch (error) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(errorcolor)
                    .setDescription(`${redtick} · There was an error! :/`)
            )
        }
    }
}