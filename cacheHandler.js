/* eslint-disable no-unused-vars */
const NodeCache = require('node-cache');
const nodeCrone = require('node-cron');

const Cache = new NodeCache();

//Clear the cache every 24 hours

const RefreshCache = nodeCrone.schedule('0 0 * * *', () => { // 0 0 * * * = Every day at midnight

  Cache.flushAll();

  console.log('Cache refreshed');

}, {
  scheduled: false
});

module.exports = Cache;

console.log('Cache initialized');
