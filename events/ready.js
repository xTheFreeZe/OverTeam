module.exports = {
  name: 'ready',
  once: true,
  execute(client) {

    client.user.setStatus('online');
    client.user.setPresence({
      activities: [{
        name: `2ez | /help`,
        type: "WATCHING"
      }]
    });

    console.log(`Ready! Logged in as ${client.user.tag}`);

  },
};