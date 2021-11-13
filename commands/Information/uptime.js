const moment = require('moment');

module.exports = {
    name: 'uptime',
    execute(client, message, args, Discord){
        const uptime = moment.duration( client.uptime );
        
        const sec = uptime.seconds() == 1 ? `${uptime.seconds()} seconds` : `${uptime.seconds()} seconds`;
        const min = uptime.minutes() == 1 ? `${uptime.minutes()} minutes` : `${uptime.minutes()} minutes`;
        const hr = uptime.hours() == 1 ? `${uptime.hours()} hours` : `${uptime.hours()} hours`;
        const days = uptime.days() == 1 ? `${uptime.days()} days` : `${uptime.days()} days`;

        message.lineReply(
            new Discord.MessageEmbed()
                .setAuthor("Uptime 📈", client.user.displayAvatarURL())
                .setColor('#A9E9F6')
                .setDescription(`\`${days}, ${hr}, ${min} and ${sec}.\``)
        )
    }
}