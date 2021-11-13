const { mongoPath, bot_token, embedcolor } = require(`./config.json`)
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();
const mongoose = require('mongoose');
const chalk = require('chalk');
const Levels = require('discord-xp');
const Distube = require('distube').default;
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
  plugins: [new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
      clientId: "f60c8b517d984a86be06dc24e1b08471",
      clientSecret: "2c17443c154449fcb6b46d76cbce5660",
    },
  }), new SoundCloudPlugin()
  ]
})

client.distube.on("playSong", (queue, song) => queue.textChannel.send(
  new Discord.MessageEmbed()
    .setColor(embedcolor)
    .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
    .setFooter(`Requested by ${song.user.tag}`, song.user.displayAvatarURL({ dynamic : true}))
))
client.distube.on("addSong", (message, queue, song) => queue.textChannel.send(
  new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**Added:**\n[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
      .setFooter(`Added by: ${song.user.username}`, song.user.displayAvatarURL({ size: 4096, dynamic: true }))
).then(message => { message.delete({ timeout: 10000 }); }))
client.distube.on("addList", (queue, playlist) => queue.textChannel.send(
  new Discord.MessageEmbed()
  .setColor(embedcolor)
  .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`)
));
client.distube.on("empty", (message, queue, song) => queue.textChannel.send(
  new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setAuthor('Clearing queue and leaving channel!')
      .setFooter('Reason: Disconnect because voice channel is empty!')
))
client.distube.on("initQueue", queue => {
  queue.autoplay = false;
  queue.volume = 100;
});
client.distube.on("error", (error) => console.log(
  "An error encountered: " + error
));

client.login(bot_token);

mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log(chalk` - Successfully connected to {bold.cyan MongoDB}! -`)
)