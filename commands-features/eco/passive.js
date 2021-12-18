
const config = require('../../config.json');
const passiveSchema = require('../../schema/passive');
const cooldownSchema = require('../../schema/cooldown-schema');
const db = require('quick.db');

module.exports = {
    name: 'passive',
    cooldown: 172800,
    async execute(client, message, args, Discord) {
        let offOn = args[0];
        if (args[0]) {
            offOn = args[0].toLowerCase()
        } else if (!args[0]) {
            message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription("To turn passive on add \`on / true / yes\` to the command.\nTo turn off passive add \`off / false / no\` to the command.")
                    .setTimestamp()
            )
            await passiveSchema.findOneAndDelete({
                userId: message.author.id,
                cmd: 'passive'
            })
            return;
        }

        if (offOn === 'on' || offOn === 'true' || offOn === 'yes') {
            passiveSchema.findOne({
                userId: message.author.id
            }, async (data, err) => {
                if (data) return message.lineReplyNoMention("Passive is **on**!")
                new passiveSchema({
                    userId: message.author.id
                }).save()
                message.lineReplyNoMention("**Enabled** passive.")
            })
            await db.set(`passivecooldown_${message.author.id}`, Date.now())
        } else if (offOn === 'off' || offOn === 'false' || offOn === 'no') {
            passiveSchema.findOne({
                userId: message.author.id
            }, async (data, err) => {
                if (!data) return message.lineReplyNoMention("Passive is **off**!")
                data.delete();
                message.lineReplyNoMention("**Disabled** passive.")
            })
            await db.set(`passivecooldown_${message.author.id}`, Date.now())
        } else {
            message.lineReplyNoMention(
                new Discord.MessageEmbed()
                    .setColor(config.embedcolor)
                    .setDescription("To turn passive on add \`on / true / yes\` to the command.\nTo turn off passive add \`off / false / no\` to the command.")
                    .setTimestamp()
            )
            await passiveSchema.findOneAndDelete({
                userId: message.author.id,
                cmd: 'passive'
            })
            return;
        }
    }
}