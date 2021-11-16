const { mongoPath, bot_token, embedcolor, spotifyID, spotifysecret } = require(`./config.json`)
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();
const mongoose = require('mongoose');
const chalk = require('chalk');
const Levels = require('discord-xp');
const Distube = require('distube').default;
const db = require('quick.db')
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

Levels.setURL(mongoPath)
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.distube = new Distube(client, {
  emitNewSongOnly: true,
  savePreviousSongs: true,
  searchSongs: 0,
  updateYouTubeDL: false,
  youtubeCookie: 'VISITOR_INFO1_LIVE=wj2zznEZWVM; tb-search-term-analysis-action=clipboard|undefined|undefined; YSC=5C9li0xMLbI; NID=221=afB0qWs5k2Sk07F0bOeqkPyKI6iIQymgNbnfpRJTqrDlsW6ypp-1KUA9dBSQ_YPEhyY4U6EikJlBootV_5KnJNqWFAVYiP9dlN03JVp31FvHzwZsSuW6P6Zpk5HDh8jtmXdzqlqmy3rlasJlmbaOn4NOegi7fYkLgN9rRRM3M9s; S=youtube_lounge_remote=X-uOo4NxSN2awlgaj5AHPIIIfYmspqsOI0oy7Lvr71w; wide=0; HSID=AA5JSrFOa2cK9QCZH; SSID=ASyyOlKBpGtfKsXVv; APISID=8u6yPLgpdy0PFoiE/AeSyUCvxF1dFH0zWN; SAPISID=S1Ous1rKQRZ_XTDP/ATBtZETqo0u91v3Eu; __Secure-1PAPISID=S1Ous1rKQRZ_XTDP/ATBtZETqo0u91v3Eu; __Secure-3PAPISID=S1Ous1rKQRZ_XTDP/ATBtZETqo0u91v3Eu; GPS=1; __Secure-3PSID=DgimBioga2EDV8K9LiI8IoQmgHjz_etqF4GrqdxbLF_6qu7Eou9KTAymfqN1UbzsYR_FlA.; PREF=tz=Asia.Calcutta&f6=40000000; LOGIN_INFO=AFmmF2swRgIhAIBrwug46RsHI_Hr7mOIJMYIOMpzIYgXCv9TpJManwnQAiEAo2Zr75PFuRHheIQr70mBFPa6SU9JpsoEQIO5lUZMd5s:QUQ3MjNmeTdsNy1vb0M2eEFmbk9wYnA3MnNFbFVtM3N3eUFPMW0tbXRiTTItTENvYVRmVDFzQnhBRG56UGZzZ1EyNE5JVkpMaW95RHNMUkt5WFQybWVIeVdVYTI1VVB3VkF4MW5tT1BHSUhDbVFzWl85dUM5VGJGaWFIMEpSQVRGcEtLalh2enptT1VZSWItSnlzR1lkME9MbUhkcVI5ZVF4bDJwcWR6bE9lb1BDUXpzQ1VjV0FLRUQxOG1xODFBaldmcTRBSzN4YzNGVlhONGRIRk9aWWVaczUyZ3A4QVVTZw==; __Secure-3PSIDCC=AJi4QfETL8RVUieOKegkYAOLFoMvFdfpTRotRVtgBCqndJxyV92pXmPXlg-Rtd8y5UlWDgKY',
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
})

client.distube.on("playSong", async (queue, song) => {
  const message = await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**Playing:**\n[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
      .setFooter(`Requested by ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
  )
  message.delete({ timeout: 30000 })
})
client.distube.on("addSong", async (queue, song) => {
  const message = await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**Added:**\n[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
      .setFooter(`Added by: ${song.user.tag}`, song.user.displayAvatarURL({ size: 4096, dynamic: true }))
  )
  message.delete({ timeout: 5000 })
})
client.distube.on("addList", async (queue, playlist) => {
  const message = await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**Added:**\n[\`${playlist.name}\`](${playlist.url}) (${playlist.songs.length} songs) to the queue!`)
      .setFooter(`Added by: ${playlist.user.tag}`, playlist.user.displayAvatarURL({ size: 4096, dynamic: true }))
  )
  message.delete({ timeout: 5000 })
});

client.distube.on("initQueue", async (queue, song) => {
  const djRole = await db.fetch(`djrole.${queue.textChannel.guild.id}`)
  if (djRole) {
    await song.member.roles.add(djRole)
  }
  queue.autoplay = false;
  queue.volume = 100;

});

client.distube.on("empty", async (queue, song) => {

  // const djRole = await db.fetch(`djrole.${queue.textChannel.guild.id}`)
  // if (song.member.roles.cache.has(djRole)) {
  //   song.member.roles.remove(djRole)
  // }
  queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setAuthor('Clearing queue and leaving channel!')
      .setFooter('Reason: Disconnect because voice channel is empty!')
  )

}
)


client.login(bot_token);

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log(chalk` - Successfully connected to {bold.cyan MongoDB}! -`)
)