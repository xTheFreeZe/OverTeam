const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {Bot_Token, Client_ID} = require('./config.json');
const fs = require('fs');

const commands = [];
const ScheduleFiles = fs.readdirSync('./commands/schedule').filter(file => file.endsWith('.js'));
const TestFiles = fs.readdirSync('./commands/testing').filter(file => file.endsWith('.js'))

for (const file of ScheduleFiles) {
  const command = require(`./commands/schedule/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Schedule files');
}

for (const file of TestFiles) {
  const command = require(`./commands/testing/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Testing files');
}

const rest = new REST({version: '9'}).setToken(Bot_Token);

(async () => {
  try {

    console.log('Started refreshing application (/) commands.');

    console.log(commands);

    await rest.put(
        Routes.applicationCommands(Client_ID),
        {body: commands},
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();