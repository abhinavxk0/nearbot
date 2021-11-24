const config = require('../../config.json')

module.exports = {
  name: '8ball',
  aliases: ['8b'],
  async execute(client, message, args, Discord) {

    if (!args[0]) return message.lineReply(
      new Discord.MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`Ask me any question!`)
        .setTimestamp()
    )
    const replies = ['yes.', 'no.', 'maybe?', 'definitely.', 'of course!', 'never.'];

    const result = Math.floor(Math.random() * replies.length);
    const question = args.join(' ');
    const a = await message.lineReply(
      new Discord.MessageEmbed()
        .setAuthor('🎱  Magic 8 Ball')
        .setColor(config.embedcolor)
        .setDescription(`\`${question}\`\n**8 Ball** says...`)
    )
    setTimeout(() => {
      a.edit(
        new Discord.MessageEmbed()
        .setAuthor('🎱  Magic 8 Ball')
        .setColor(config.embedcolor)
        .setDescription(`\`${question}\`\n**8 Ball** says... ${replies[result]}`)
      )
    }, 500);
  }
};