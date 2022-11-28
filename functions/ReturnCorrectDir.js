const fs = require('fs');

/**
 * This function returns the correct directory for the file, only works on the 2ez Bot though.
 * Literally a 2ez exclusive file manager
 * @param {*} file
 * @returns Directory of the file
 */
const ReturnCorrectDir = (file) => {

  const TestFiles = fs.readdirSync('./commands/testing').filter(file => file.endsWith('js'));

  if (TestFiles.includes(file)) {
    console.log('Found file in testing directory');
    return 'testing'
  } else {
    throw new Error('Was not able to find directory for file: ' + file);
  }

};


module.exports = ReturnCorrectDir;