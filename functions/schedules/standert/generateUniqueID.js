const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

/**
 * This function generates a unique ID
 * @returns {String} A unique ID
 */
const generateUniqueID = () => {

  const uuid = uuidv4();

  const hash = crypto.createHash('MD5').update(uuid).digest('hex');

  return hash.substring(0, 8);

};

module.exports = generateUniqueID;


