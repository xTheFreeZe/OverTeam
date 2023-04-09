const redisClient = require('./redisClient');

redisClient.keys('*', (err, keys) => {
  if (err) return console.log(err);

  console.log(keys);
});