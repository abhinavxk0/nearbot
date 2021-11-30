const config = require('../../config.json')
const counter = require('../../schema/command-counter-schema')
const commaNumber = require('comma-number')
const Levels = require('discord-xp')
const levelingsys = require('../../schema/settings-schema')
const playedtimes = require('../../schema/play-schema');
const quickdb = require('quick.db')
module.exports = {
    name: 'profile',
    async execute(client, message, args, Discord){
        const member = message.mentions.users.first() || message.author;
        const data = await counter.findOne({
            userId: member.id
        })
        let cmdcount;
        if (data){
            cmdcount = commaNumber(data.countNum)
        } else {
            cmdcount = 0;
        }
        const datatwo = await playedtimes.findOne({
            userId: member.id
        })
        let playcount;
        if (datatwo){
            playcount = commaNumber(datatwo.playNum)
        } else {
            playcount = 0
        }

        const a = await quickdb.fetch(`counter_${message.author.id}`)

        const userBal = await client.bal(member.id);
        const lee = await levelingsys.findOne({ Guild: message.guild.id });
        let lebel;
        if (lee){
            const user = await Levels.fetch(member.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1);
            lebel = `Leveling System is \`ENABLED\`.\nOn Level \`${user.level}\`, needs \`${neededXp}xp\` to reach Level \`${user.level + 1}\`!`
        } else {
            lebel = `Leveling System is \`DISABLED\`.`
        }
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(member.tag)
                .setThumbnail(member.displayAvatarURL({ dynamic : true}))
                .setDescription(`Have used **NearBot** \`${a}\` times!\nHas \`$${commaNumber(userBal)}\` in your balance.\nAdded \`${playcount} songs\` to NearBot in total!\n\n${lebel}`)
                .setTimestamp()
        )
    }
}