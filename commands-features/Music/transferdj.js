const { embedcolor } = require('../../config.json')
const db = require('quick.db')
module.exports = {
    name: 'transferdj',
    async execute(client, message, args, Discord){
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = message.guild.member(djUser)
        const djRole = await db.fetch(`djrole.${message.guild.id}`)
        const mention = message.mentions.members.first();
        const queue = await client.distube.getQueue(message);
    
        if (message.member.id != djUser) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#A9E9F6')
            .setDescription('you are not the dj for this music session!')
            .setFooter(`${djmember.tag} is the current dj`)
        )
            if (djRole){
                await message.member.roles.remove(djRole)
                await mention.roles.add(djRole)
            } 
            await db.set(`djuser.${message.guild.id}`, mention.id)
            message.lineReply(
                new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`dj transferred to ${mention}`)
            )
        
    }
}