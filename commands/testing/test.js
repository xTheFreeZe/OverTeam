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
    console.log("🚀 ~ file: test.js:16 ~ execute ~ Cache.get(interaction.guild.id);", Cache.get(interaction.guild.id))

    interaction.reply("Cache data:", Cache.data, data);

    console.log(Cache);

  },
};