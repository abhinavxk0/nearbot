const db = require('quick.db');
const config = require('../../config.json')
module.exports = {
    name: 'starboard-min',
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You do not have the \`MANAGE_CHANNELS\` permission to use this command.`)
        )
        if (!args[0]){
            return message.lineReply(
                new Discord.MessageEmbed()  
                    .setColor(config.embedcolor)
                    .setDescription('Enter a minimum amount of reactions for starboard to activate.')
            )
        } 
        if (isNaN(args[0])){
            return message.lineReply(
                new Discord.MessageEmbed()  
                    .setColor(config.embedcolor)
                    .setDescription('Enter a number.')
            )
        }

        const number = parseInt(args[0]);

        if (number == 0){
            return message.lineReply(
                new Discord.MessageEmbed()  
                    .setColor(config.embedcolor)
                    .setDescription('Enter a number above 0.')
            )
        }

        await db.set(`targetstar_${message.guild.id}`, number)
        message.lineReply(
            new Discord.MessageEmbed()  
                .setColor(config.embedcolor)
                .setDescription(`Alright now any message with more than ${number} star reactions will be in the starboard!! :))`)
        )
    }
}