const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
}

const SchedulePresetSchema = new mongoose.Schema({
  name: requiredString,
  creationChannel: requiredString,
  channelID: requiredNumber,
  creationDate: {
    type: Date,
    default: Date.now,
  },
  Description: requiredString,
  users: {
    userOne: requiredString,
    userTwo: requiredString,
    userThree: requiredString,
    userFour: requiredString,
    userFive: requiredString,
    userSix: requiredString,
    userSeven: requiredString,
    userEight: requiredString,
    userNine: requiredString,
    userTen: requiredString,
  },
  scheduleCreator: requiredString,
  scheduleCreatorID: requiredNumber,
});

module.exports = mongoose.model('SchedulePreset', SchedulePresetSchema);

console.log('Exported SchedulePresetSchema.js')