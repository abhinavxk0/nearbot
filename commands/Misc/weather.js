const weather = require('weather-js');

module.exports = {
    name: 'weather',
    async execute(client, message, args, Discord) {

        if (!args[0]) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription(`Enter a location to fetch weather results for.`)
        )

        const msg = await message.lineReply(
            new Discord.MessageEmbed()
                .setColor('#A9E9F6')
                .setDescription('Loading...')
        )

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {

            if (result === undefined || result.length === 0) return msg.edit(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription('Invalid location entered.')
            )

            var current = result[0].current;
            var location = result[0].location;

            if (error) return msg.edit(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription(`There was an error fetching the weather for ${location}`)
            );

            msg.edit(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setAuthor(`${current.temperature}°C, ${current.skytext}`, current.imageUrl)
                    .setTimestamp()
                    .setDescription(`**${current.observationpoint}**
                                    - Humidity: ${current.humidity}%
                                    - Wind Speed: ${current.winddisplay}
                                    - Timezone: UTC+${location.timezone}`)
            )


        })

    }
}