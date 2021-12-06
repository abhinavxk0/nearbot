const db = require('quick.db')
const { embedcolor, errorcolor } = require('../../config.json')
const commaNumber = require('comma-number')

module.exports = {
    name: 'rob',
    cooldown: 60 * 5,
    aliases: ['steal'],
    async execute(client, message, args, Discord){
        const target = message.mentions.users.first()
        if (!target){
            return message.lineReply('Mention someone to rob!')
        }
        if (target.id == message.author.id){
            return message.lineReply(`You can't rob yourself!`)
        }
        const last_rob = await db.fetch(`rob_${target.id}`);
        const current_time = Date.now();
        if ((last_rob + 300000) > current_time){
            return message.lineReply('This user had been robbed from in the last 5 mins! Give them a break!')
        }
        const targetbal = await client.bal(target.id);
        const autbal = await client.bal(message.author.id)
        if (targetbal < 500){
            return message.lineReply(`**${target.user.username}** is poor, leave them alone!`)
        }
        if (autbal < 500){
            return message.lineReply("You're poor! Don't steal cash from others!")
        }

        const per = Math.floor(Math.random() * 2) + 1;
        let rate;
        if (per == 1){
            rate = true
        } else {
            rate = false
        }
        const winamt = Math.floor(Math.random() * ((targetbal / 3) - 600) + 600);
        const robamt = Math.floor(Math.random() * ((targetbal / 16) - 600) + 600);

        if (rate == true){
            await   client.del(target.id, robamt)
                    client.add(message.author.id, winamt)
            
            const belence = await client.bal(message.author.id)
            message.lineReply(`You robbed ${target} stealing \`$${commaNumber(winamt)}\`!\nNow you have \`$${commaNumber(belence + winamt)}\`.`)
            db.set(`rob_${target.id}`, Date.now())
        } else {
            await client.del(message.author.id, robamt)
            const belence = await client.bal(message.author.id)
                message.lineReply(`You got caught while robbing ${target} and got fined \`$${commaNumber(robamt)}\`!\nNow you have \`$${commaNumber(belence - robamt)}\`.`)
        }
        
    }
}