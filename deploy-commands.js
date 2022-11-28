const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const TestFiles = fs.readdirSync('./commands/testing').filter(file => file.endsWith('js'));

for (const file of ManagementFiles) {
  const command = require(`./commands/management/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Management files');
}

for (const file of PlayerblacklistFiles) {
  const command = require(`./commands/playerblacklist/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Playerblacklist files');
}

for (const file of TeamBlacklistFiles) {
  const command = require(`./commands/teamblacklist/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved TeamBlacklist files');
}

for (const file of ScheduleFiles) {
  const command = require(`./commands/schedules/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Schedule files');
}

for (const file of TeamDatabaseFiles) {
  const command = require(`./commands/teamdatabase/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved TeamDatabase files');
}

for (const file of UtilityFiles) {
  const command = require(`./commands/utility/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Utility files');
}

for (const file of TestFiles) {
  const command = require(`./commands/testing/${file}`);
  commands.push(command.data.toJSON());
  console.log('Recieved Testing files');
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();