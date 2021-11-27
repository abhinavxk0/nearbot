const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')
const dailySchema = require('../../schema/daily-schema')
const Levels = require('discord-xp')
const moment = require('moment')
const level = require('../../schema/settings-schema')

module.exports = {
    name: 'daily',
    cooldown: 0,
    async execute(client, message, args, Discord) { 

        const data = await level.findOne({ Guild: message.guild.id });

        const { guild, member } = message;
        const { id } = member;

        const obj = {
            userId: id
        }

        const results = await dailySchema.findOne(obj)
        if (results) {

            const b = results.updatedAt;
            const c = b.getTime();
            const d = c + 86400000;
            var e = moment(d).fromNow( true)

            const then = new Date(results.updatedAt).getTime();
            const now = new Date().getTime();
            const difference = Math.abs(now - then);
            const diffdays = Math.round(difference / (1000 * 60 * 60 * 24));

            if (diffdays <= 1) {
                message.lineReply(`You already claimed your daily rewards!\nCome back in ${e}! :))`)
                return
            }
        }

        await dailySchema.findOneAndUpdate(obj, obj, {
            upsert: true
        })

        const coins = Math.floor(Math.random() * 2000) + 1500;
        client.add(id, coins)
        if (data) {
            message.lineReply(`You collected \`$${commaNumber(coins)}\` and \`+100 xp\` for today!\nCheck back in ${e} for more rewards!`)
            Levels.appendxp(id, guild.id, 100)
        } else {
            message.lineReply(`You collected \`$${commaNumber(coins)}\` for today!\nCheck back in ${e} for more rewards!`)
        }

    }
}
