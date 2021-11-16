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
  searchSongs: 0,
  searchCooldown: 15,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
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

client.distube.on("initQueue", async (queue, song, message) => {
  queue.autoplay = false;
  queue.volume = 100;
  const djRole = await db.fetch(`djrole.${message.guild.id}`)
  if (djRole) {
    await song.user.roles.add(djRole)
  } else return;
});

client.distube.on("empty", async (queue, song, message) => {
  const djRole = await db.fetch(`djrole.${message.guild.id}`)
  queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setAuthor('Clearing queue and leaving channel!')
      .setFooter('Reason: Disconnect because voice channel is empty!')
  )
  if (song.user.roles.cache.has(djRole)) {
    song.user.roles.remove(djRole)
  } else return;
}
)


client.login(bot_token);

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log(chalk` - Successfully connected to {bold.cyan MongoDB}! -`)
)