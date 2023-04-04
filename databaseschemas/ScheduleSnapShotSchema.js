const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const nonRequiredString = {
  type: String,
  required: false,
};

const requiredNumber = {
  type: Number,
  required: true,
}

const ScheduleSnapShotSchema = new mongoose.Schema({
  interaction: requiredString,
  name: requiredString,
  creationChannel: requiredString,
  channelID: requiredNumber,
  creationDate: {
    type: Date,
    default: Date.now,
  },
  description: requiredString,
  scheduleCreator: requiredString,
  scheduleCreatorID: requiredNumber,
  users: {
    userOne: nonRequiredString,
    userTwo: nonRequiredString,
    userThree: nonRequiredString,
    userFour: nonRequiredString,
    userFive: nonRequiredString,
    userSix: nonRequiredString,
    userSeven: nonRequiredString,
    userEight: nonRequiredString,
    userNine: nonRequiredString,
    userTen: nonRequiredString,
  },
});

module.exports = mongoose.model('ScheduleSnapShotSchema', ScheduleSnapShotSchema);

console.log('Exported ScheduleSnapShotSchema.js');