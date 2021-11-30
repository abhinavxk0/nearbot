const config = require('../../config.json')
const counter = require('../../schema/command-counter-schema')
const commaNumber = require('comma-number')
const Levels = require('discord-xp')
const levelingsys = require('../../schema/settings-schema')
const playedtimes = require('../../schema/play-schema');

module.exports = {
    name: 'profile',
    async execute(client, message, args, Discord){
        const data = await counter.findOne({
            userId: message.author.id
        })
        let cmdcount;
        if (data){
            cmdcount = commaNumber(data.countNum)
        } else {
            cmdcount = 0;
        }
        const datatwo = await playedtimes.findOne({
            userId: message.author.id,
        })
        let playcount;
        if (datatwo){
            playcount = commaNumber(datatwo.playNum)
        } else {
            playcount = 0
        }
        
        const userBal = await client.bal(message.author.id);
        const lee = await levelingsys.findOne({ Guild: message.guild.id });
        let lebel;
        if (lee){
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const neededXp = Levels.xpFor(parseInt(user.level) + 1);
            lebel = `Leveling System is \`ENABLED\`.\nYou're on Level \`${user.level}\`, you need \`${neededXp}xp\` to reach Level \`${user.level + 1}\`!`
        } else {
            lebel = `Leveling System is \`DISABLED\`.`
        }
        message.lineReply(
            new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(message.author.tag)
                .setThumbnail(message.author.displayAvatarURL({ dynamic : true}))
                .setDescription(`You have used **NearBot** \`${cmdcount}\` times!\nYou have \`$${commaNumber(userBal)}\` in your balance.\nYou have added \`${playcount} songs\` to NearBot in total!\n\n${lebel}`)
                .setFooter('😏')
                .setTimestamp()
        )
    }
}