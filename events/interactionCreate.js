const GetScheduleData = require('../functions/schedules/standert/GetScheduleData.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    if (!interaction.isButton()) return;

    // Get the identifier from the custom ID. This will be used to get the data from the database.
    const identifier = interaction.customId.substring(0, 8);

    console.log('Identifier:', identifier);

    // Get the data from the database.
    const data = await GetScheduleData(identifier);

    // console.log('Data:', data);
    
    interaction.reply('Button pressed. Custom ID: ' + interaction.customId);

  }

};