const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

const crypto = require('crypto');

function hashUUID(uuid) {
  const hash = crypto.createHash('MD5').update(uuid).digest('hex');
  return hash.substring(0, 8);
}

const hash = hashUUID(uuid);

console.log(hash);