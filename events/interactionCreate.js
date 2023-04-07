module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    if (!interaction.isButton()) return;
    
    interaction.reply('Button pressed. Custom ID: ' + interaction.customId);

  }

};