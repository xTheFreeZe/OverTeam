const ScheduleSnapShotSchema = require('../../../databaseschemas/ScheduleSnapShotSchema.js');
const { scheduleInCache, saveScheduleInCache } = require('../../../cache/scheduleInCache.js');

// eslint-disable-next-line no-unused-vars
const colors = require('colors');

/**
 * This function returns all data from a schedule
 * @param {String} identifier
 */
const GetScheduleData = async (identifier) => {

  console.log(`Looking in cache after: ${identifier}`.yellow);

  const cacheSchedule = await scheduleInCache(identifier);

  if (cacheSchedule) {

    console.log('Found in cache'.green.bold);
    return cacheSchedule;

  } else {

    console.log('Not in cache, looking in database'.red.bold);

  }

  const data = await ScheduleSnapShotSchema.findOne({
    identifier: identifier
  });

  // If no data is found, return null
  if (!data) return null;

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
    reactions: {
      reactionOne: data.reactions.reactionOne,
      reactionTwo: data.reactions.reactionTwo,
      reactionThree: data.reactions.reactionThree,
      reactionFour: data.reactions.reactionFour,
      reactionFive: data.reactions.reactionFive,
      reactionSix: data.reactions.reactionSix,
      reactionSeven: data.reactions.reactionSeven,
      reactionEight: data.reactions.reactionEight,
      reactionNine: data.reactions.reactionNine,
      reactionTen: data.reactions.reactionTen
    }
  };

  console.log('Found in database'.green.bold);

  if (!cacheSchedule) {

    console.log('Not yet in Cache - Saving schedule to cache'.blue.bold);
    await saveScheduleInCache(identifier, obj);

  }

  return obj;

};

module.exports = GetScheduleData;