const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const Cache = require('../.././cacheHandler.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('A cute test command!'),
  async execute(interaction) {

    console.log('Test command executed');

    const data = Cache.get(interaction.guild.id);

    interaction.reply("Cache data:", data);

  },
};