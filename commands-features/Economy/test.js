const config = require('../../config.json')
const dailySchema = require('../../schema/daily-schema')
const moment = require('moment')

module.exports = {
    name: 'test',
    async execute(client, message, args, Discord){
        const a = await dailySchema.findOne({
            guildId: message.guild.id,
            userId: message.author.id
        })
        const b = a.updatedAt;
        const c = b.getTime();
        const d = c + 86400000;
        const e = moment(d).fromNow( true)
        
        message.lineReply(`Next daily in ${e}.`)
    }
}