const db = require('quick.db')
const { embedcolor } = require('../../config.json')
const djSchema = require('./schema/djrole-schema');

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'dc', 'leave'],
    async execute(client, message, args, Discord) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('You need to be in a voice channel to execute this command!')
        ).then(message => { message.delete({ timeout: 10000 }); })
        if (!message.guild.me.hasPermission("SPEAK")) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`I cannot play music in this channel, I am lacking the \`SPEAK\` permission!`)
        )  

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('I am not currently playing in this guild.')
        ).then(message => { message.delete({ timeout: 10000 }); })
        

        if (memberVC !== clientVC) return message.lineReplyNoMention(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`You need to be in ${message.guild.me.voice.channel} to execute this command!`)
        ).then(message => { message.delete({ timeout: 10000 }); })

        let queue = await client.distube.getQueue(message);
        if (!queue) return 
        
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djmember = await message.guild.member(djUser)
        const djRoles = await djSchema.findOne({
            guildId: message.guild.id
        })
        if (djRoles){
            if (!message.member.id === djUser) return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`You are not the DJ for this music session!\n${djmember} is the current DJ.`)            
            )
        }

        const a = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor(embedcolor)
                .setDescription(`loading <a:loading:910721336542916660>`)
        )
            
            client.distube.stop(message)
            try {
                a.delete()
            } catch (err) {
                throw err;
            }

            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Disconnected!')
            )
            const target = message.guild.member(djUser)

            if (djRoles.roleId){
                if (djUser){
                    if (target.roles.cache.has(djRoles.roleId)){
                        try {
                            target.roles.remove(djRoles.roleId)
                          } catch (err) {
                            console.log(`There was an error while removing ${target.tag}'s DJ role.\nGuild ID: ${queue.id}\nUser ID: ${target.user.id}`)
                            throw err;
                          }
                      }
                      db.delete(`djuser.${message.guild.id}`)
                }
            }
        
    }
}

