const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('test')
      .setDescription('A cute test command!'),
  async execute(interaction) {

    interaction.reply('cool');

  },
};