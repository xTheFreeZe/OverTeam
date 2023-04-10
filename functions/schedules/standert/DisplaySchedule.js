/* eslint-disable no-unused-vars */
const GetScheduleData = require('./GetScheduleData.js');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

/**
 * This will display the schedule in the channel
 * @param {String} indentifier 
 */
const DisplaySchedule = async (indentifier, interactionchannel) => {

  const data = await GetScheduleData(indentifier);
  const channel = interactionchannel;

  const neutralEmoji = "<:OverTeam_Neutral:1074132245696233573>";
  const yesEmoji = "<:OverTeam_Yes:1074131419535777884>";
  const noEmoji = "<:OverTeam_No:1074131594593452134>";
  const tentativeEmoji = "<:OverTeam_Tentative:1074131651132666017>";

  if (data === null) return interactionchannel.send('It appears that this schedule does not exist! This should not happen, please contact the developer!');

  console.log(data);

  const scheduleName = data.name;
  const scheduleCreationDateInUnix = data.creationDateInUnix;
  const scheduleDescription = data.description === "null" ? "React to change your availability!" : data.description;
  const scheduleMeetingDay = data.meetingDay ? data.meetingDay : "Not set yet!";
  const scheduleMeetingTime = data.meetingTime ? data.meetingTime : "Not set yet!";
  const scheduleReminderDate = data.reminderDate ? data.reminderDate : null;

  const userOne = data.users.userOne;
  const userTwo = data.users.userTwo ? data.users.userTwo : null;
  const userThree = data.users.userThree ? data.users.userThree : null;
  const userFour = data.users.userFour ? data.users.userFour : null;
  const userFive = data.users.userFive ? data.users.userFive : null;
  const userSix = data.users.userSix ? data.users.userSix : null;
  const userSeven = data.users.userSeven ? data.users.userSeven : null;
  const userEight = data.users.userEight ? data.users.userEight : null;
  const userNine = data.users.userNine ? data.users.userNine : null;
  const userTen = data.users.userTen ? data.users.userTen : null;

  const reminderString = scheduleReminderDate == null ? 'No reminder set!' : `Reminder set!`;

  const userOneString = `${neutralEmoji} ${userOne}`;
  const userTwoString = userTwo === "null" ? '' : `${neutralEmoji} ${userTwo}`;
  const userThreeString = userThree === "null" ? '' : `${neutralEmoji} ${userThree}`;
  const userFourString = userFour === "null" ? '' : `${neutralEmoji} ${userFour}`;
  const userFiveString = userFive === "null" ? '' : `${neutralEmoji} ${userFive}`;
  const userSixString = userSix === "null" ? '' : `${neutralEmoji} ${userSix}`;
  const userSevenString = userSeven === "null" ? '' : `${neutralEmoji} ${userSeven}`;
  const userEightString = userEight === "null" ? '' : `${neutralEmoji} ${userEight}`;
  const userNineString = userNine === "null" ? '' : `${neutralEmoji} ${userNine}`;
  const userTenString = userTen === "null" ? '' : `${neutralEmoji} ${userTen}`;

  const embedDescription =
    `**${scheduleDescription}**

  ⏰ **Meeting time:** ${scheduleMeetingTime}
  ⌚ **Created <t:${scheduleCreationDateInUnix}:R>**

  ${userOneString}

  ${userTwoString}

  ${userThreeString}

  ${userFourString}

  ${userFiveString}

  ${userSixString}

  ${userSevenString}

  ${userEightString}

  ${userNineString}

  ${userTenString}`;

  const Buttons = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${indentifier}_schedule_button_yes`)
        .setEmoji(yesEmoji)
        .setStyle('SECONDARY'),
    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${indentifier}_schedule_button_no`)
        .setEmoji(noEmoji)
        .setStyle('SECONDARY'),
    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${indentifier}_schedule_button_tentative`)
        .setEmoji(tentativeEmoji)
        .setStyle('SECONDARY'),
    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${indentifier}_schedule_button_manage`)
        .setLabel('Manage')
        .setStyle('PRIMARY'),
    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${indentifier}_schedule_button_delete`)
        .setLabel('Delete')
        .setStyle('DANGER'),
    );


  const scheduleEmbed = new MessageEmbed()
    .setTitle(`Schedule: ${scheduleName}`)
    .setColor("#0099ff")
    .setDescription(embedDescription)
    .setFooter({
      text: reminderString,
    });

  channel.send({ content: 'Here is your schedule:', embeds: [scheduleEmbed], components: [Buttons] });

};


module.exports = DisplaySchedule;