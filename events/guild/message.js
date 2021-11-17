const cooldowns = new Map();
const moment = require('moment');
const AFKS = require(`../../schema/afk-schema`);
const prefixdb = require('../../schema/prefix-schema')
const levelSchema = require('../../schema/settings-schema')
const Levels = require('discord-xp');
const quickdb = require('quick.db');

module.exports = async (Discord, client, message) => {

    if (message.author.bot) return;

    const data = await prefixdb.findOne({
        guild: message.guild.id
    })
    let prefix;
    if (data) {
        prefix = data.prefix
    } else if (!data) {
        prefix = 'n!'
    }
    await quickdb.set(`prefix.${message.guild.id}`, prefix)





    let data2;
    try {
        data2 = await AFKS.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        })
        if (!data2) {
            data2 = await AFKS.create({
                userID: message.author.id,
                guildID: message.guild.id
            })
        }
    } catch (error) {
        throw error;
    }
    if (data2.AFK === true) {
        data2.AFK_Reason = null
        data2.AFK = false
        data2.time = null
        message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(`Welcome back ${message.member}! I reset your AFK!`)
                .setColor('#defafe')
        ).then(msg => { msg.delete({ timeout: 10000 }); })
        await data2.save()
    }
    const mentionedMember = message.mentions.members.first()
    if (mentionedMember) {
        let data3;
        try {
            data3 = await AFKS.findOne({
                userID: mentionedMember.id,
                guildID: message.guild.id
            })
            if (!data3) {
                data3 = await AFKS.create({
                    userID: mentionedMember.id,
                    guildID: message.guild.id
                })
            }
        } catch (error) {
            console.log(error)
        }
        if (data3.AFK == true) {
            message.lineReply(
                new Discord.MessageEmbed()
                    .setDescription(`${mentionedMember} is AFK!\n${data3.AFK_Reason}`)
                    .setFooter(`- ${moment(data3.time).fromNow()}`)
                    .setColor('#defafe')
            ).then(msg => { msg.delete({ timeout: 10000 }); })
            data3.time = null
            await data3.save()
        }

    }


    await levelSchema.findOne(
        { Guild: message.guild.id },
        async (err, data) => {
          if (!data) return;
          const randomXp = Math.floor(Math.random() * 20) + 1
          const hasLeveledUp = await Levels.appendXp(
            message.author.id,
            message.guild.id,
            randomXp
          );
          const lvlup = await quickdb.fetch(`announce.${message.guild.id}`)
          if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);

            if (lvlup){
                const lvlchannel = message.guild.channels.cache.get(lvlup)
                lvlchannel.send(message.author,
                    new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setAuthor(message.author.tag)
                    .setDescription(`Congrats!\n${message.author} just leveled up to **level ${user.level}**!`)
                    .setTimestamp()
                )
            } 
            message.channel.send(`Congrats ${message.author.tag}!\nYou just leveled up to **level ${user.level}**!`)
              .then((msg) => msg.delete({ timeout: 10000 }));
          }
        }
      );



    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id) && message.content.includes("prefix")) {
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#defafe')
                .setFooter("NearBot", client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(
                    `The prefix for ${client.user} is \`${prefix}\`
            **[Invite NearBot](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)**
            `
                )
        );
    };



    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (!cooldowns.has(commandName)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const currentTime = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = command.cooldown * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (currentTime < expirationTime) {
            const timeLeft = (expirationTime - currentTime) / 1000;

            return message.lineReply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using that command! :)`)
        }
    }

    timestamps.set(message.author.id, currentTime);

    setTimeout(() => {
        timestamps.delete(message.author.id)
    }, cooldownAmount);

    try {
        command.execute(client, message, args, Discord)
    } catch (error) {
        console.log(error)
        message.lineReply(`There was an error executing this command!`)
    }
}