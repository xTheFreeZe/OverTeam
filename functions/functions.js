const dotenv = require("dotenv");
dotenv.config();

/**
 * @description Returns the current player slot - used for schedules
 * @returns {Array}
 * @param {Array} PlayerSlot
 */
const FindArrayToUpdate = (array, user, time) => {

  if (!(array.toString())) return array.toString(); //return this empty array so it doens't show up in the schedule

  if (array.toString().replace(/!/, '').includes(user)) {

    array.pop();
    array.push(`🕗 ${user} joins at ${time}`);

    return array.toString();

  } else {

    return array.toString(); //return the original array

  }

};

/**
 * @description Returns the reminder message used for schedules
 * @param {Array} CompleteArray
 * @param {Array} YesVoters
 * @param {Array} WillNotPing
 * @param {String} channel
 */
const CreateScheduleReminderMessage = async (CompleteArray, WillNotPing, channel) => {

  let YesVoters = [];

  for (let i = 0; i < CompleteArray.length; i++) {

    if (CompleteArray[i].includes(`<:2ez_Schedule_Yes:933802728130494524>`)) {

      if (YesVoters.includes(CompleteArray[i])) {

        YesVoters.push("");

      } else {

        YesVoters.push(CompleteArray[i]);

      }

    }

  }

  let RealReminder = YesVoters.toString().replace(/<:2ez_Schedule_Yes:933802728130494524>/g, '').replace(/,/g, ' ').replace(`${WillNotPing}`, '').replace(/,/g, '').trim();

  if (RealReminder.length == 0) {

    console.log('Reminder was not sent because either no users were mentioned or no users voted yes!');
    YesVoters = []; //reset the array
    return;

  } else {

    YesVoters = []; //reset the array
    return channel.send(`${RealReminder} here is your reminder for the scrim in 15 minutes!`);

  }

};


module.exports = {
  FindArrayToUpdate,
  CreateScheduleReminderMessage
}

console.log('Exported custom functions');