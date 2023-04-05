/* eslint-disable no-unused-vars */
const GetScheduleData = require('./GetScheduleData.js');
const { MessageEmbed } = require("discord.js");

/**
 * This will display the schedule in the channel
 * @param {String} indentifier 
 */
const DisplaySchedule = async (indentifier, interactionchannel) => {

  const data = await GetScheduleData(indentifier);
  const channel = interactionchannel;

  const neutralEmoji = "<:OverTeam_Neutral:1074132245696233573>";

  console.log(data);

  const scheduleName = data.name;
  const scheduleCreationDateInUnix = data.creationDateInUnix;
  const scheduleDescription = data.description;
  const scheduleMeetingTime = data.meetingTime ? data.meetingTime : "Not set yet!";
  const scheduleReminderDate = data.reminderDate ? data.reminderDate : undefined;

  const userOne = data.users.userOne;
  const userTwo = data.users.userTwo ? data.users.userTwo : undefined;
  const userThree = data.users.userThree ? data.users.userThree : undefined;
  const userFour = data.users.userFour ? data.users.userFour : undefined;
  const userFive = data.users.userFive ? data.users.userFive : undefined;
  const userSix = data.users.userSix ? data.users.userSix : undefined;
  const userSeven = data.users.userSeven ? data.users.userSeven : undefined;
  const userEight = data.users.userEight ? data.users.userEight : undefined;
  const userNine = data.users.userNine ? data.users.userNine : undefined;
  const userTen = data.users.userTen ? data.users.userTen : undefined;

  const userOneString = `${neutralEmoji} ${userOne}`;
  const userTwoString = userTwo == null ? `${neutralEmoji} ${userTwo}` : '';
  const userThreeString = userThree == null ? `${neutralEmoji} ${userThree}` : '';
  const userFourString = userFour == null ? `${neutralEmoji} ${userFour}` : '';
  const userFiveString = userFive == null ? `${neutralEmoji} ${userFive}` : '';
  const userSixString = userSix == null ? `${neutralEmoji} ${userSix}` : '';
  const userSevenString = userSeven == null ? `${neutralEmoji} ${userSeven}` : '';
  const userEightString = userEight == null ? `${neutralEmoji} ${userEight}` : '';
  const userNineString = userNine == null ? `${neutralEmoji} ${userNine}` : '';
  const userTenString = userTen == null ? `${neutralEmoji} ${userTen}` : '';

  const embedDescription =
    `> **${scheduleDescription}**

  > **Meeting time:** ${scheduleMeetingTime}

  > **Created <t:${scheduleCreationDateInUnix}:R>**

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

  const scheduleEmbed = new MessageEmbed()
    .setTitle(`Schedule: ${scheduleName}`)
    .setDescription(embedDescription)
    .setFooter({
      text: `Schedule created by ${data.scheduleCreator}`,
    });

  channel.send({content:"Here is your schedule:" ,embeds: [scheduleEmbed] });

};


module.exports = DisplaySchedule;