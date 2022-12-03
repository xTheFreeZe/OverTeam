const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const ChangeServerLanguage = require('../../functions/ChangeServerLangauge');
const TranslateText = require('../../functions/TranslateText');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('change-language')

    .setDescription('Choose a language the bot will use for your server')

    .addStringOption(option =>
      option.setName('language')
        .setDescription('The language you want the bot to use')
        .setRequired(true)
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'German', value: 'de' },
        )),

  async execute(interaction) {

    const ChosenLanguage = interaction.options.getString('language');

    console.log(ChosenLanguage);

    const data = {
      ServerName: interaction.guild.name,
      ServerID: interaction.guild.id,
      Language: ChosenLanguage,
      Text: 'The bot will now talk in the chosen language',
    }

    ChangeServerLanguage.call(data);

    try {

      interaction.reply(TranslateText.call(data));

    } catch(error) {

      console.error(error);
      interaction.reply('Something went wrong while trying to change the language');

    }
  }

};