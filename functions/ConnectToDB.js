const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/**
 * @returns {Promise<void>}
 * @constructor
 * @description Connects to the database by passing in the SRV string
 */
const ConnectToDatabase = async () => {

  mongoose.set('strictQuery', true);

  console.log('Trying to connect...');
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGODB_SRV, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true

  }).then(() => {

    console.log(`Connected to Database!`);

  }).catch((e) => {

    console.log(`Something went wrong: ${e}`);

  });

};

module.exports = ConnectToDatabase;