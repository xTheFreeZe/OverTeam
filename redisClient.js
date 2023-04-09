const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('ready', () => {

  // We define it here so we can use it in other files
  module.exports = redisClient;
  console.log('Redis client connected');

});

