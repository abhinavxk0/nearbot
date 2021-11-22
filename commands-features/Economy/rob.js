const db = require('quick.db')
const { embedcolor, errorcolor } = require('../../config.json')
const convert = require('parse-ms');
const moment = require('moment')
const commaNumber = require('comma-number')

module.exports = {
    name: 'rob',
    cooldown: 60 * 5,
    aliases: ['steal'],
    async execute(client, message, args, Discord){
        const target = message.mentions.members.first()
        if (!target){
            return message.lineReply('mention someone to rob!')
        }
        if (target.id == message.author.id){
            return message.lineReply('you cant rob yourself!')
        }
        const last_rob = await db.fetch(`rob_${target.id}`);
        const current_time = Date.now();
        if ((last_rob + 300000) > current_time){
            return message.lineReply('this user had been robbed from in the last 5 mins, give them a break!')
        }
        const targetbal = await client.bal(target.id);
        const autbal = await client.bal(message.author.id)
        if (targetbal < 500){
            return message.lineReply(`**${target.user.username}** is poor, leave them alone`)
        }
        if (autbal < 500){
            return message.lineReply(`you're poor. you can't steal from others!`)
        }

        const per = Math.floor(Math.random() * 2) + 1;
        let rate;
        if (per == 1){
            rate = true
        } else {
            rate = false
        }
        const halftar = 50/100 * targetbal
        const robamt = Math.round(Math.random() * halftar - 1) + 1;

        if (rate == true){
            await client.del(target.id, robamt)
            await client.add(message.author.id, robamt)
            message.lineReply(`you robbed ${target} stealing \`$${commaNumber(robamt)}\``)
            db.set(`rob_${target.id}`, Date.now())
        } else {
            await client.del(message.author.id, robamt)
                message.lineReply(`you got caught while robbing ${target} and got fined \`$${commaNumber(robamt)}\``)
        }
        
    }
}