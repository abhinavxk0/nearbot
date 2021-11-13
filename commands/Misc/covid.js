const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports = {
    name: 'covid',
    async execute(client, message, args, Discord){
        
        if ( !args.length ){
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setDescription("Please enter a country's name.")
            )
        } 
        if ( args.join(" ") === 'all'|| "ALL" || "All"){
            const covidAll = await track.all();
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setAuthor('Global Cases 🌐')
                    .addFields(
                        {
                            name: "__Today's Cases__",
                            value: covidAll.todayCases, 
                            inline: true,
                        },
                        {
                            name: "__Today's Deaths__",
                            value: covidAll.todayDeaths,
                            inline: true,
                        },
                        {
                            name: "__Active Cases__",
                            value: covidAll.active,
                            inline: true,
                        },
                        {
                            name: '__Total Cases__',
                            value: covidAll.cases,
                            inline: true,
                        },
                        {
                            name: '__Total Deaths__',
                            value: covidAll.deaths,
                            inline: true,
                        },
                        {
                            name: '__Total Recovered__',
                            value: covidAll.recovered,
                            inline: true,
                        },
                        
                    )
            )
        } else {
            const covidCountry = await track.countries(args.join(" "))
            return message.lineReply(
                new Discord.MessageEmbed()
                    .setColor('#A9E9F6')
                    .setAuthor(`${covidCountry.country}'s Cases`)
                    .addFields(
                        {
                            name: "__Today's Cases__",
                            value: covidCountry.todayCases, 
                            inline: true,
                        },
                        {
                            name: "__Today's Deaths__",
                            value: covidCountry.todayDeaths,
                            inline: true,
                        },
                        {
                            name: "__Active Cases__",
                            value: covidCountry.active,
                            inline: true,
                        },
                        {
                            name: '__Total Cases__',
                            value: covidCountry.cases,
                            inline: true,
                        },
                        {
                            name: '__Total Deaths__',
                            value: covidCountry.deaths,
                            inline: true,
                        },
                        {
                            name: '__Total Recovered__',
                            value: covidCountry.recovered,
                            inline: true,
                        },
                        
                    )
            )

        }
    }
}