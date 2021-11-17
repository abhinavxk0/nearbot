const ms = require('ms')
const db = require('quick.db')

module.exports = {
    name: 'mute',
    aliases: ['m'],
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_ROLES\` permission to use this command.`)
        )
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I do not have the \`MANAGE_ROLES\` permission.`)
        )

        var muteRole = await db.fetch(`muterole.${message.guild.id}`);
        if (muteRole == null) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`There is no mute role set for this server.`)
        )
        var user = message.mentions.members.first()
        if (!user) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Enter a user to mute.`)
        )
        if (user.id == message.author.id) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You cannot mute yourself.`)
        )
        if (user.id == client.user.id) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Please don't mute me after all that I did for you.`)
        ) 
        
        let time = args[1];
        let reason = args.slice(2).join(" ");

        if (!args[0]) return message.reply(`\`mute @member time reason\``)
        if (!user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('you cannot mute this member as they are the same role as you or higher')
        if (!time) return message.reply(`\`mute @member time reason\``)
        if (!reason) reason = 'No Reason';

        await user.roles.add(muteRole)
            .then(
                message.lineReply(
                    new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`${user} has been muted.`)
                )
            )
        
        // setTimeout(function () {
            // if(!user.roles.cache.has(muteRole)) return;
            // user.roles.remove(muteRole)
            // message.channel.send(`${user} has been unmuted.`)
        // }, ms(time));

        setTimeout(() => {
            if(!user.roles.cache.has(muteRole)) return;
            user.roles.remove(muteRole)
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`${user} has been unmuted.`)
            )
        }, ms(time));


    }
}