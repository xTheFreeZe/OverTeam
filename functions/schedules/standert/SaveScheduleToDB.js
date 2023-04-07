const ScheduleSnapShotSchema = require('../../../databaseschemas/ScheduleSnapShotSchema.js');
const DisplaySchedule = require('./DisplaySchedule.js');

/**
 * This saves or updates the schedule to the database.
 * @param {String} identifier 
 * @param {Objec} object 
 */
const saveScheduleTODB = async (identifier, channel, object) => {

  const newScheduleSnapShot = new ScheduleSnapShotSchema({
    interaction: object.interaction,
    identifier: object.identifier,
    name: object.name,
    creationChannel: object.creationChannel,
    channelID: object.channelID,
    creationDate: object.creationDate,
    creationDateInUnix: object.creationDateInUnix,
    description: object.description,
    scheduleCreator: object.scheduleCreator,
    scheduleCreatorID: object.scheduleCreatorID,
    meetingDay: object.meetingDay,
    meetingTime: object.meetingTime,
    reminderDate: `${object.reminderDate}`,
    users: {
      userOne: object.users.userOne,
      userTwo: object.users.userTwo,
      userThree: object.users.userThree,
      userFour: object.users.userFour,
      userFive: object.users.userFive,
      userSix: object.users.userSix,
      userSeven: object.users.userSeven,
      userEight: object.users.userEight,
      userNine: object.users.userNine,
      userTen: object.users.userTen,
    },
  });


  await newScheduleSnapShot.save().catch((err) => {

    console.log(err);
    return;

  });

  console.log('Saving process complete!');

  DisplaySchedule(identifier, channel); //This will display the schedule in the channel

};

module.exports = saveScheduleTODB;
