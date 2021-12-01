const Levels = require('discord-xp');
const canvacord = require('canvacord')
const schema = require('../../schema/settings-schema')
module.exports = {
    name: 'level',
    aliases: ['rank', 'lvl', 'r'],
    async execute(client, message, args, Discord) {
      const data = await schema.findOne({ Guild: message.guild.id });
      if (!data) return message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription("Leveling system is **disabled**.")
        );
        try {
            let member;
            if (message.mentions.users.first()) {
                member = message.mentions.users.first();
            } else {
                member = message.author;
            }
          const user = await Levels.fetch(member.id, message.guild.id);
    
          if (!user) message.reply({content: `Mhm, Looks like you dont have any xp yet!`});
    
          const neededXp = Levels.xpFor(parseInt(user.level) + 1);
    
          const rank = new canvacord.Rank()
            .setAvatar(
              member.displayAvatarURL({ dynamic: false, format: "jpg" })
            )
            .setCurrentXP(user.xp)
            .setLevel(user.level)
            .setRequiredXP(neededXp)
            .setStatus(member.presence.status)
            .setProgressBar("WHITE", "COLOR")
            .setUsername(member.username)
            .setDiscriminator(member.discriminator)
            .setRank(user.rank + 1);
          rank.build().then((data) => {
            const attachment = new Discord.MessageAttachment(data, "rank.png");
            message.channel.send({files: [attachment]});
          });
        } catch (e) {
          console.log(e);
        }
    }
}