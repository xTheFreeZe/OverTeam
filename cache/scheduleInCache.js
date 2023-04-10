const cache = require('./startCache.js');

/**
 * This function checks if a schedule is in the cache
 * @param {String} identifier 
 * @returns {Object}
 */
const scheduleInCache = async (identifier) => {

  const cachedSchedule = await cache.get(identifier);

  if (cachedSchedule !== undefined) {

    return JSON.parse(cachedSchedule);

  }

  return undefined;

};

const saveScheduleInCache = async (identifier, schedule) => {

  cache.set(identifier, JSON.stringify(schedule));

};

module.exports = { scheduleInCache, saveScheduleInCache };