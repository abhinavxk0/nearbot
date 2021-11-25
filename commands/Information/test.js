const config = require('../../config.json')
const az = require('azlyrics-ext')
const gen = require('genius-api')
const api = new gen(config.geniusaccess)

module.exports = {
    name: 'test',
    async execute(client, message, args, Discord){
        api.search('In The Dark').then(function(response){
            console.log('hits', response.hits[0].lyrics)
        })
    }
}