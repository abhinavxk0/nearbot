const fs = require("fs");

module.exports = ( client, Discord ) => {
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {

        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {

            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);

        }

    }
    const featureFolders = fs.readdirSync('./commands-features')
    for (const featfolder of featureFolders){
        const featureCommands = fs.readdirSync(`./commands-features/${featfolder}`).filter(file => file.endsWith('.js'))
        for (const featurefile of featureCommands){
            const featureCommand = require(`../commands-features/${featfolder}/${featurefile}`)
            client.commands.set(featureCommand.name, featureCommand)
        }
    }
}