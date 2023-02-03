const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Bot_Token, Client_ID } = require('./config.json');
const fs = require('node:fs');

const commands = [];

fs.readdir('./commands/', (err, folders) => {

  if (err) {
    console.log(err);
    return;
  }

  for (const folder of folders) {

    (async () => {

      fs.readdir(`./commands/${folder}`, (err, file) => {

        if (err) {
          console.log(err);
          return;
        }

        file.forEach((f) => {

          const command = require(`./commands/${folder}/${f}`);
          const data = command.data.toJSON();

          commands.push(data);

        });

      });


    })

  }

});

console.log(commands);

const rest = new REST({ version: '9' }).setToken(Bot_Token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(Client_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();