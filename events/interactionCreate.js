module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    console.log('Interaction created');

    //Handling autocomplete
    if (interaction.isAutocomplete()) {

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return console.log('Command not found');

      try {

        await command.autocomplete(interaction);

      } catch (error) {

        console.error(error);
      }

    }

  }

};