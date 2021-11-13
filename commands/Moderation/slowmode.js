const ms = require('ms')

module.exports = {
    name: 'slowmode',
    async execute(client, message, args, Discord){
        const rawchnl = message.mentions.channels.first() || message.channel;
        const chnl = await client.channels.cache.get(rawchnl.id)
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )

        if (!args[1]){
            chnl.setRateLimitPerUser(0);
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Slowmode for ${chnl} has been removed.`)                
            )
            return;
        }
        const raw = args[1];
        const milliseconds = ms(raw);

        if (isNaN(milliseconds)){
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Slowmode duration entered was invalid.`)                
            )
            return;
        }

        if (milliseconds < 1000){
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`The minimum slowmode is 1 second.`)                
            )
            return;
        }

        chnl.setRateLimitPerUser(milliseconds / 1000)
        return  message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription(`Slowmode for ${chnl} has been set to ${ms(milliseconds, {
                long: true
            })}`)                
        )
    }
}