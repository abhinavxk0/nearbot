const config = require('../../config.json');
const mSchema = require('../../schema/muterole-schema');
const dSchema = require('../../schema/djrole-schema');
const lvlschema = require('../../schema/settings-schema')
const qdb = require('quick.db');

module.exports = {
    name: 'settings',
    aliases: ['config'],
    async execute(client, message, args, Discord){
        const muteRole = await mSchema.findOne({
            guildId: message.guild.id
        });
        let muteROLE;
        if (muteRole){
            muteROLE = message.guild.roles.cache.get(muteRole.roleId)
        } else if (!muteRole){
            muteROLE = `\`Not Set\``
        }
        const djRole = await dSchema.findOne({
            guildId: message.guild.id
        });
        let djROLE;
        if (djRole){
            djROLE = message.guild.roles.cache.get(djRole.roleId)
        } else if (!djRole){
            djROLE = `\`Not Set\``
        }
        let star = qdb.fetch(`starboard_${message.channel.guild.id}`)
        let starboard = ` \`Enabled\``
        if (!star){
            starboard = '\`Disabled\`'
        }
        let LEVEL = `\`Enabled\``
        const data = await lvlschema.findOne({ Guild: message.guild.id });
        if (!data){
            LEVEL = `\`Disabled\``
        }
        message.lineReply(
            new Discord.MessageEmbed()
                .setTitle('🔧 · Settings')
                .setThumbnail(message.guild.iconURL({dynamic: true}))
                .setDescription(`Custom settings for \`${message.guild.name}\``)
                .setColor(config.embedcolor)
                .addField(`🔇 · Mute Role`, muteROLE, true)
                .addField(`🎵 · DJ Role`, djROLE, true)
                .addField(`⭐ · Starboard`, starboard, true)
                .addField(`📈 · Leveling`, LEVEL, true)
                .setTimestamp()
        )
    }
}