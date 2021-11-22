const cooldowns = new Map();
const cooldown = require('../../schema/cooldown-schema')
const moment = require('moment');
const AFKS = require(`../../schema/afk-schema`);
const prefixdb = require('../../schema/prefix-schema')
const levelSchema = require('../../schema/settings-schema')
const Levels = require('discord-xp');
const quickdb = require('quick.db');

module.exports = async (Discord, client, message) => {

    async function commandExecute(){
        if (command){
            if (command) command.execute(client, message, args, Discord)
        }
    }

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
                .setColor('#A9E9F6')
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
                    .setColor('#A9E9F6')
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
                    .setColor('#ff9700')
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setAuthor(message.author.tag)
                    .setDescription(`Congrats!\n${message.author} just leveled up to **level ${user.level}**!`)
                    .setTimestamp()
                )
            } 
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor('#ff9700')
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setAuthor(message.author.tag)
                .setDescription(`Congrats!\n${message.author} just leveled up to **level ${user.level}**!`)
                .setTimestamp()
            )
              .then((msg) => msg.delete({ timeout: 10000 }));
          }
        }
      );



    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id) && message.content.includes("prefix")) {
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setFooter("NearBot", client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(
                    `The prefix for ${client.user} is \`${prefix}\`\n
[\`Invite NearBot\`](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)
            `
                )
        );
    };



    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if(command.cooldown) {
        const current_time = Date.now();
        const cooldown_amount = (command.cooldown) * 1000
    
        cooldown.findOne({ userId: message.author.id, cmd: command.name }, async(err, data) => {
            if(data) {
                const expiration_time = data.time + cooldown_amount;
            
                if(current_time < expiration_time) {
                    const time_left = (expiration_time -  current_time) / 1000
                                    
                    if(time_left.toFixed(1) >= 3600){
                        let hour = (time_left.toFixed(1) / 3600).toLocaleString();
                        hour = Math.round(hour)
                        return message.lineReply(`Please wait ${hour.toLocaleString()} more hours before using \`${command.name}\`!`)
                    }
                    if(time_left.toFixed(1) >= 60) {
                        let minute = (time_left.toFixed(1) / 60);
                        minute = Math.round(minute)
                        return message.lineReply(`Please wait ${minute} more minutes before using \`${command.name}\`!`)
                    }
                    let seconds = (time_left.toFixed(1)).toLocaleString();
                    seconds = Math.round(seconds)
                    return message.lineReply(`Please wait ${seconds} more seconds before using \`${command.name}\`!`)
                    } else {
                        await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                        commandExecute();
                    }
            } else {
                commandExecute();
                new cooldown({
                    userId: message.author.id,
                    cmd: command.name,
                    time: current_time,
                    cooldown: command.cooldown,
                }).save();
            }
        })
    } else {
        commandExecute();
    };
}