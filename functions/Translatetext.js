const translate = require('google-translate-api');
const Cache = require('.././cacheHandler.js');

async function TranslateText() {

  console.log(this.Text);

  await translate(this.text ? this.text : 'The bot will now talk in the chosen language', { to: 'de' }).then(res => {

    console.log(res.text);
    return res.text;

  });

}

// Path: functions\TranslateText.js
module.exports = TranslateText;