const SchedulePresetSchema = require('../../databaseschemas/SchedulePresetSchema.js');

/**
 * Create a new schedule preset. This will be saved to the database.
 * @param presetData
 * @constructor
 */
const CreateNewPreset = (presetData) => {

  console.log(presetData);

  const newPreset = new SchedulePresetSchema({
    name: presetData.name,
    creationChannel: presetData.creationChannel,
    channelID: presetData.channelID,
    creationDate: presetData.creationDate,
    description: presetData.description,
    scheduleCreator: presetData.scheduleCreator,
    scheduleCreatorID: presetData.scheduleCreatorID,
    users: {
      userOne: presetData.users.userOne,
      userTwo: presetData.users.userSecond,
      userThree: presetData.users.userThird,
      userFour: presetData.users.userFourth,
      userFive: presetData.users.userFifth,
      userSix: presetData.users.userSixth,
      userSeven: presetData.users.userSeventh,
      userEight: presetData.users.userEighth,
      userNine: presetData.users.userNinth,
      userTen: presetData.users.userTenth,
    },
  });

  newPreset.save().then(() => console.log('Saved new preset to database!')).catch((e) => {

    console.error(e);

  });

};


module.exports = CreateNewPreset;