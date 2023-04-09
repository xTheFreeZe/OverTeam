const ScheduleSnapShotSchema = require('../../../databaseschemas/ScheduleSnapShotSchema.js');
const redisClient = require('../../../redisClient.js');

// eslint-disable-next-line no-unused-vars
const colors = require('colors');

/**
 * This function returns all data from a schedule
 * @param {String} identifier
 */
const GetScheduleData = async (identifier) => {

  console.log(`Looking in database after: ${identifier}`.blue);

  redisClient.get(identifier, async (err, data) => {

    if (err) throw err;

    if (data !== null) {

      console.log('Found in redis cache!'.green.bold);

      //If the data is found in the cache, we return it
      return JSON.parse(data);

    }

    //We know that the data is not in the cache
    console.log('Not found in redis cache!'.red.bold);

  });

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
    meetingDay: data.meetingDay,
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

  redisClient.set(identifier, JSON.stringify(obj), (err) => {

    if (err) {

      console.error(err);

    } else {

      console.log('Saved in redis cache!'.yellow.bold);

    }

  });

  return obj;

};

module.exports = GetScheduleData;