const config = require('../../config.json')
const db = require('quick.db')
const djSchema = require('../../schema/djrole-schema')

module.exports = {
    name: 'transferdj',
    async execute(client, message, args, Discord) {
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = message.guild.member(djUser)
        const djRoles = await djSchema.findOne({
            guildId: message.guild.id
        })
        const mention = message.mentions.users.first();
        const queue = await client.distube.getQueue(message);
        const newDJ = message.guild.member(mention.id)




        if (!message.member.id === djUser) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.errorcolor)
                .setDescription('you are not the dj for this music session!')
                .setFooter(`${djmember.tag} is the current dj`)
        )

        if (!mention) {
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription(`Mention a user to transfer DJ to.`)
            )
        }

        if (djRoles) {
            try {
                await message.member.roles.remove(djRoles.roleId)
                await newDJ.roles.add(djRoles.roleId)
            } catch (err){
                throw err;
            }
            }
        await db.set(`djuser.${message.guild.id}`, mention.id)
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setDescription(`dj transferred to ${mention}`)
        )

    }
}