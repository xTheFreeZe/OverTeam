const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Bot_Token, Client_ID } = require('./config.json');
const rest = new REST({ version: '9' }).setToken(Bot_Token);

(async () => {
  try {
    console.log('Started deleting application (/) commands.');

    rest.put(Routes.applicationCommands(Client_ID), { body: [] })
      .then(() => console.log('Successfully deleted all application commands.'))
      .catch(console.error);

  } catch (error) {
    console.error(error);
  }
})();