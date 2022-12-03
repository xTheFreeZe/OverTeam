const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const ChangeServerLanguage = require('../functions/ChangeServerLanguage.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('change-language')

    .setDescription('Choose a language the bot will use for your server')

    .addStringOption(option =>
      option.setName('language')
        .setDescription('The language you want the bot to use')
        .setRequired(true)
        .addChoices(
          { name: 'English', value: 'english' },
          { name: 'German', value: 'german' },
        )),

  async execute(interaction) {

    const ChosenLanguage = interaction.options.getString('language');

    console.log(ChosenLanguage);

    await ChangeServerLanguage(ChosenLanguage);

    interaction.reply('Language changed'); // This is a placeholder, will be changed so it actually changes the language
  }

};