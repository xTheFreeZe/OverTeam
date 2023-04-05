const SchedulePresetSchema = require('../../../databaseschemas/SchedulePresetSchema.js');
const {MessageEmbed} = require("discord.js");

/**
 * Create a new schedule preset. This will be saved to the database.
 * @param presetData
 * @param channel
 * @constructor
 */
const CreateNewPreset = (presetData, channel) => {

  console.log(presetData);

  try {

    const newPreset = new SchedulePresetSchema({
      _id: presetData._id,
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

    //Check if the _id already exists
    SchedulePresetSchema.findOne({_id: presetData._id}, (err, doc) => {

      if (err) {

        console.error(err);

      } else if (doc) {

        console.log('Preset already exists in database!');

        const filter = {
          "_id": presetData._id
        };

        SchedulePresetSchema.findOneAndUpdate(filter, newPreset).catch((e) => {

          console.error(e);

        });

      } else {

        console.log('Preset does not exist in database!');
        newPreset.save().then(() => console.log('Saved new preset to database!')).catch((e) => {

          console.error(e);

        });

      }

    });

  } catch (e) {

    const ErrorEmbed = new MessageEmbed()
        .setTitle('Something went wrong!')
        .setDescription(`Something went wrong while saving your schedule! Please try again later!`)
        .setColor('RED');

    console.error(e);

    return channel.send({
      embeds: [ErrorEmbed],
    });

  }

};


module.exports = CreateNewPreset;