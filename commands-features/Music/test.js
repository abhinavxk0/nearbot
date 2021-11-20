const { embedcolor, errorcolor } = require('../../config.json')
const db = require('quick.db')
module.exports = {
    name: 'test',
    async execute(client, message, args, Discord){
        const djUser = await db.fetch(`djuser.${message.guild.id}`)
        const djRole = await db.fetch(`djrole.${message.guild.id}`)

        message.channel.send(`dj role: ${djRole}\ndj user: ${djUser}`)
    }
}