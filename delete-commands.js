const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started deleting application (/) commands.');

    rest.put(Routes.applicationCommands(clientId), { body: [] })
      .then(() => console.log('Successfully deleted all application commands.'))
      .catch(console.error);

  } catch (error) {
    console.error(error);
  }
})();