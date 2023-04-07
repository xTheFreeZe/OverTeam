const ConnectToDatabase = require("../functions/ConnectToDB");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {

    // await ConnectToDatabase();

    client.user.setStatus('online');
    client.user.setPresence({
      activities: [{
        name: `Overwatch`,
        type: "PLAYING"
      }]
    });

    console.log(`Ready! Logged in as ${client.user.tag}`);

  },
};