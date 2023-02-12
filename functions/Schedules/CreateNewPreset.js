const SchedulePresetSchema = require('../../databaseschemas/SchedulePresetSchema.js');

/**
 * Create a new schedule preset. This will be saved to the database.
 * @param presetData
 * @param playerData
 * @constructor
 */
const CreateNewPreset = (presetData, playerData) => {

  console.log(presetData);

  console.log(playerData);

  const newPreset = new SchedulePresetSchema({
    name: presetData.name,
    creationChannel: presetData.creationChannel,
    channelID: presetData.channelID,
    creationDate: presetData.creationDate,
    description: presetData.description,
    scheduleCreator: presetData.scheduleCreator,
    scheduleCreatorID: presetData.scheduleCreatorID,
    users: {
      userOne: playerData.userOne,
      userTwo: playerData.userSecond,
      userThree: playerData.userThird,
      userFour: playerData.userFourth,
      userFive: playerData.userFifth,
      userSix: playerData.userSixth,
      userSeven: playerData.userSeventh,
      userEight: playerData.userEighth,
      userNine: playerData.userNinth,
      userTen: playerData.userTenth,
    },
  });

  newPreset.save().then(() => console.log('Saved new preset to database!'));

};


module.exports = CreateNewPreset;