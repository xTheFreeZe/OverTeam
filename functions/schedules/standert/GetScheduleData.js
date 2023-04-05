const ScheduleSnapShotSchema = require('../../../databaseschemas/ScheduleSnapShotSchema.js');

/**
 * This function returns all data from a schedule
 * @param {String} identifier
 */
const GetScheduleData = async (identifier) => {

  console.log('Looking in database after:', identifier);

  const data = await ScheduleSnapShotSchema.findOne({
    identifier: identifier
  });

  const obj = {
    interaction: data.interaction,
    identifier: data.identifier,
    name: data.name,
    creationChannel: data.creationChannel,
    channelID: data.channelID,
    creationDate: data.creationDate,
    creationDateInUnix: data.creationDateInUnix,
    description: data.description,
    scheduleCreator: data.scheduleCreator,
    scheduleCreatorID: data.scheduleCreatorID,
    meetingTime: data.meetingTime,
    reminderDate: data.reminderDate,
    users: {
      userOne: data.users.userOne,
      userTwo: data.users.userTwo,
      userThree: data.users.userThree,
      userFour: data.users.userFour,
      userFive: data.users.userFive,
      userSix: data.users.userSix,
      userSeven: data.users.userSeven,
      userEight: data.users.userEight,
      userNine: data.users.userNine,
      userTen: data.users.userTen,
    },
  };

  return obj;

};

module.exports = GetScheduleData;