const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')
const dailySchema = require('../../schema/daily-schema')
const Levels = require('discord-xp')
const level = require('../../schema/settings-schema')
let claimedCache = [];  
const clearCache = () => {
    claimedCache = [];
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()


module.exports = {
    name: 'daily',
    cooldown: 0,
    async execute(client, message, args, Discord) {

        const data = await level.findOne({ Guild: message.guild.id });

        const { guild, member } = message;
        const { id } = member;

        if (claimedCache.includes(id)){
            console.log('Returning from cache...')
            message.lineReply('You already claimed your daily rewards!\nCome back tomorrow! :))')
            return
        }

        const obj = {
            guildId: guild.id,
            userId: id
        }

        const results = await dailySchema.findOne(obj)
        console.log("RESULTS:", results)
        if (results) {
            const then = new Date(results.updatedAt).getTime();
            const now = new Date().getTime();

            const difference = Math.abs(now - then);
            const diffdays = Math.round(difference / (1000 * 60 * 60 * 24));

            if (diffdays <= 1){
                claimedCache.push(id)
                message.lineReply('You already claimed your daily rewards!\nCome back tomorrow! :))')
                return
            }
        }

        await dailySchema.findOneAndUpdate(obj, obj, {
            upsert: true
        })

        claimedCache.push(id)
        const coins = Math.floor(Math.random() * 2000) + 1500;
        client.add(id, coins)
        if (data){
            message.lineReply(`You collected \`$${commaNumber(coins)}\` and \`+ 1 level\` for today!\nCheck back tomorrow for more rewards!`)
            Levels.appendLevel(id, guild.id, 1)
        } else {
            message.lineReply(`You collected \`$${commaNumber(coins)}\` for today!\nCheck back tomorrow for more rewards!`)
        }
        
    }
}
