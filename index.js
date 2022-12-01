/* eslint-disable no-undef */
const fs = require('fs');

const {
  Bot_Token,
} = require('./config.json');

const {
  Client,
  Intents,
  Collection,
} = require('discord.js');

const ReturnCorrectDir = require('./functions/ReturnCorrectDir.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const TestFiles = fs.readdirSync('./commands/testing').filter(file => file.endsWith('js'));
const ScheduleFiles = fs.readdirSync('./commands/schedule').filter(file => file.endsWith('js'));

const commandFiles = [...TestFiles, ...ScheduleFiles];

for (const file of commandFiles) {

  let dir = ReturnCorrectDir(file);

  const command = require(`./commands/${dir}/${file}`);

  client.commands.set(command.data.name, command);

}

console.log('Loaded all files');

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (!interaction.guild) return interaction.reply({ content: 'You can\'t use this command in DMs!' });

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {

    await command.execute(interaction);

  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `There was an error while executing this command: ${error}`,
      ephemeral: true
    });
  }

});

client.login(Bot_Token);