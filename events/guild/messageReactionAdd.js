const db = require('quick.db');
const { MessageEmbed, ReactionManager } = require('discord.js');
const moment = require('moment');

module.exports = async (Discord, client, reaction, user) => {
    if(reaction.emoji.name === '⭐')
    {
        db.add(`reactionstar_${reaction.message.id}`, 1)
        let testcount = db.fetch(`reactionstar_${reaction.message.id}`);
        var target = db.fetch(`targetstar_${reaction.message.channel.guild.id}`);
        if(!target)
        {
            var target = 3;
        }
        if(testcount > target)
        { let checking = db.fetch(`alreadyornot_${reaction.message.id}`)
           if(checking === "yes")
           {
               return;
           }
           db.set(`alreadyornot_${reaction.message.id}`, "yes")
           var channel2 = db.fetch(`starboard_${reaction.message.channel.guild.id}`)
           const channelto = client.channels.cache.get(channel2);
           var content = reaction.message.content;
           if(!content || content === "")
           {
               var content = 'Embed'
           }
           let attimage;
           if (reaction.message.attachments.first()){
                attimage = reaction.message.attachments.first().url
                if (attimage.endsWith('.mp4')){
                    const a = await channelto.send(attimage)
                    return channelto.send(
                        new MessageEmbed()
                            .setColor('#FFAC33')
                            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTitle('⬆️ This video was starred.')
                            .setURL(a.url)
                            .setFooter(`${reaction.message.id} - posted in ${reaction.message.channel.name} - ${moment(reaction.message.createdTimestamp).fromNow()}`)

                    )
                } else {
                    return channelto.send(
                        new MessageEmbed()
                        .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setImage(attimage)
                        .addField('Source', `[Click here.](${reaction.message.url})`)
                        .setDescription(content)
                        .setFooter(`${reaction.message.id} - posted in ${reaction.message.channel.name} - ${moment(reaction.message.createdTimestamp).fromNow()}`)
                        .setColor('#FFAC33')
                       )
                }
                
           } else {
               channelto.send(
                new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField('Source', `[Click here.](${reaction.message.url})`)
                .setDescription(content)
                .setFooter(`${reaction.message.id} - posted in ${reaction.message.channel.name} - ${moment(reaction.message.createdTimestamp).fromNow()}`)
                .setColor('#FFAC33')
               )
           }
        }
    } else {
        return;
    }
}
    