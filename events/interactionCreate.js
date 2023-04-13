const GetScheduleData = require('../functions/schedules/standert/GetScheduleData.js');
const FindScheduleSlot = require('../functions/schedules/standert/FindScheduleSlot.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    if (!interaction.isButton()) return;

    const yesEmoji = "<:OverTeam_Yes:1074131419535777884>";
    const noEmoji = "<:OverTeam_No:1074131594593452134>";
    const tentativeEmoji = "<:OverTeam_Tentative:1074131651132666017>";

    // Get the identifier from the custom ID. This will be used to get the data from the database.
    const identifier = interaction.customId.substring(0, 8);
    const button = interaction.customId.substring(8);

    let emoji = "";

    if (button.toString().includes("yes")) {

      emoji = yesEmoji;

    } else if (button.toString().includes("no")) {

      emoji = noEmoji;

    } else if (button.toString().includes("tentative")) {

      emoji = tentativeEmoji;

    }

    // Get the data from the database.
    const data = await GetScheduleData(identifier);

    if (data === null) return interaction.reply('It appears that this schedule does not exist! This should not happen, please contact the developer!');

    let users = data.users;

    const index = FindScheduleSlot(`${interaction.member}`, data.users);

    console.log("Index to edit:", index);

    const newSlot = users[index] = `${emoji} ${interaction.member}`;

    console.log("New slot:", newSlot);

    console.log("New users:", users);

    interaction.reply('Button pressed. Custom ID: ' + interaction.customId);

  }

};