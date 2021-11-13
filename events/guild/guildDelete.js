const prefixSchema = require('../../schema/prefix-schema');
const Levels = require('discord-xp')

module.exports = async (Discord, client, guild) => {
    await prefixSchema.findOneAndDelete({
        _id: guild.id
    })
    await Levels.deleteGuild(guild.id)
}