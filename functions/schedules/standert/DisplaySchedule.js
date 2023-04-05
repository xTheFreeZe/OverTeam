const GetScheduleData = require('./GetScheduleData.js');


/**
 * This will display the schedule in the channel
 * @param {String} indentifier 
 */
const DisplaySchedule = async (indentifier) => {

  const data = await GetScheduleData(indentifier);

  console.log(data);

};


module.exports = DisplaySchedule;