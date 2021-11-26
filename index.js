const { mongoPath, bot_token, embedcolor, youtubecookie } = require(`./config.json`)
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();
const mongoose = require('mongoose');
const chalk = require('chalk');
const Levels = require('discord-xp');
const Distube = require('distube').default;
const db = require('quick.db')
const economySchema = require('./schema/economy-schema')
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

Levels.setURL(mongoPath)
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix;
["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.distube = new Distube(client, {
  emitNewSongOnly: true,
  savePreviousSongs: true,
  searchSongs: 0,
  emptyCooldown: 15,
  updateYouTubeDL: false,
  nsfw: true,
  youtubeCookie: youtubecookie,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
})

client.distube.on("playSong", async (queue, song) => {

  await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**playing:**\n[\`${song.name}\`](${song.url}) - \`${song.formattedDuration}\``)
      .setFooter(`added by ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
  )

})
client.distube.on("addSong", async (queue, song) => {

  await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**added:**\n[\`${song.name}\`](${song.url}) - \`${song.formattedDuration}\``)
      .setFooter(`added by: ${song.user.tag}`, song.user.displayAvatarURL({ size: 4096, dynamic: true }))
  )

})
client.distube.on("addList", async (queue, playlist) => {

  await queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`**added:**\n[\`${playlist.name}\`](${playlist.url})`)
      .setFooter(`added by: ${playlist.user.tag}`, playlist.user.displayAvatarURL({ size: 4096, dynamic: true }))
  )

});

client.distube.on("initQueue", async (queue) => {

  const djRole = await db.fetch(`djrole.${queue.textChannel.guild.id}`)
  const song = queue.songs[0]
  if (djRole) {
    try{
      song.member.roles.add(djRole)
    } catch(err){
      console.log(`There was an error while removing ${song.user.tag}'s DJ role.\nGuild ID: ${queue.id}\nUser ID: ${target.user.id}`)
      throw err;
    }
    db.set(`djuser.${queue.id}`, song.user.id)
  }
  queue.autoplay = false;
  queue.volume = 100;

});

client.distube.on("empty", async (queue, song) => {

  const djUser = await db.fetch(`djuser.${queue.id}`)
  const djRole = await db.fetch(`djrole.${queue.id}`)
  const guild = queue.textChannel.guild;
  const target = guild.member(djUser)

  if (djRole) {
    if (djUser) {
      if (target.roles.cache.has(djRole)) {
        try {
          target.roles.remove(djRole)
        } catch (err) {
          console.log(`There was an error while removing ${target.tag}'s DJ role.\nGuild ID: ${queue.id}\nUser ID: ${target.user.id}`)
          throw err;
        }
      }
      db.delete(`djuser.${queue.id}`)
    }
  }

  queue.textChannel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`leaving ${queue.voiceChannel} because it was empty :c`)
  )

})

client.distube.on("disconnect", async (queue) => {
  console.log(`- Bot got disconnected from the voice channel.`)

  const djUser = await db.fetch(`djuser.${queue.id}`)
  const djRole = await db.fetch(`djrole.${queue.id}`)
  const guild = queue.textChannel.guild;
  const target = guild.member(djUser)

  if (djRole) {
    if (djUser) {
      if (target.roles.cache.has(djRole)) {
        try {
          target.roles.remove(djRole)
        } catch (err) {
          console.log(`There was an error while removing ${target.tag}'s DJ role.\nGuild ID: ${queue.id}\nUser ID: ${target.user.id}`)
          throw err;
        }
      }
      db.delete(`djuser.${queue.id}`)
    }
  }
})

client.distube.on("deleteQueue", async (queue) => {
  console.log(`- - The queue was deleted for some reason.`)

  const djUser = await db.fetch(`djuser.${queue.id}`)
  const djRole = await db.fetch(`djrole.${queue.id}`)
  const guild = queue.textChannel.guild;
  const target = guild.member(djUser)

  if (djRole) {
    if (djUser) {
      if (target.roles.cache.has(djRole)) {
        try {
          target.roles.remove(djRole)
        } catch (err) {
          console.log(`There was an error while removing ${target.tag}'s DJ role.\nGuild ID: ${queue.id}\nUser ID: ${target.user.id}`)
          throw err;
        }
      }
      db.delete(`djuser.${queue.id}`)
    }
  }
})

client.distube.on("error", (channel, error) => channel.send(
  console.log(chalk.red`DISTUBE ERROR!!: ${error}`)
));

client.distube.on("searchNoResult", async (message, query) => {
  message.channel.send(
    new Discord.MessageEmbed()
      .setColor(embedcolor)
      .setDescription(`no results were found for \`${query}\` :/`)

  )
})







client.bal = (id) => new Promise(async ful => {
  const data = await economySchema.findOne({ id })
  if (!data) {
    return ful(0)
  }
  ful(data.coins)
})

client.add = (id, coins) => {
  economySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new economySchema({ id, coins })
    }
    data.save()
  })
  console.log('Add money, triggered.')
}

client.del = (id, coins) => {
  economySchema.findOne({ id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new economySchema({ id, coins: -coins })
    }
    data.save()
  })
  console.log('Removed money, triggered.')
}






mongoose.connect(mongoPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  console.log(chalk` - Successfully connected to {bold.cyan MongoDB}! -`)
)

client.login(bot_token);