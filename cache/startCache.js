const NodeCache = require('node-cache');
const cache = new NodeCache();

// We export the cache so we can use it in other files
console.log('Started cache');
module.exports = cache;