const chalk = require('chalk')

module.exports = ( Discord, client ) => {


      client.user.setPresence({
        activity: {
          name: '@NearBot prefix',
          type: "LISTENING"
      },
      status: "idle",
    }).then(
      console.log(chalk` - NearBot is {bold.cyan online}! -`)
    )

  
  };
  