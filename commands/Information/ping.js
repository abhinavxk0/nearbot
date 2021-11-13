module.exports = {
    name: 'ping',
    cooldown: 1,
    async execute(client, message, args, Discord){
        let m = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setAuthor('Pong! 🏓', client.user.displayAvatarURL())
                .setDescription(`\`WS Ping: ${Math.round( client.ws.ping )}ms \n Message Ping: _Pinging..._\``)
        )
        const msgPing = m.createdTimestamp - message.createdTimestamp;

        m.edit(
            new Discord.MessageEmbed()
                .setAuthor('Pong! 🏓', client.user.displayAvatarURL())
                .setColor('#A9E9F6')
                .setDescription(`\`WS Ping: ${Math.round( client.ws.ping )}ms \n Message Ping: ${msgPing}ms\``)
        )
    }
}