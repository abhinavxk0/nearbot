const db = require('quick.db')

const { embedcolor } = require('../../config.json')

module.exports = {
    name: 'test',
    async execute(client, message, args, Discord){
        const djuser = await db.fetch(`djuser.${message.guild.id}`)
        message.channel.send(djuser)
    }
}