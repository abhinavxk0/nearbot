const { embedcolor } = require('../../config.json')
const db = require('quick.db')
module.exports = {
    name: 'transferdj',
    async execute(client, message, args, Discord){
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = message.guild.member(djUser)
        const mention = message.mentions.members.first();
        const queue = await client.distube.getQueue(message);

        if (!queue){
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(embedcolor)
                    .setDescription('there is nothing playing in the queue right now')
            )
        }
        if (message.member.id != djUser) return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#defafe')
            .setDescription('you are not the dj for this music session!')
            .setFooter(`${djmember.tag} is the current dj`)
        )
        const olddj = message.guild.member(message.author.id)
        olddj.roles.remove(djRole)
        mention.roles.add(djRole)
        db.set(`djuser.${message.guild.id}`, mention.id)
        message.lineReply(
            new Discord.MessageEmbed()
            .setColor('#defafe')
            .setDescription(`dj transferred to ${mention}`)
        )
    }
}