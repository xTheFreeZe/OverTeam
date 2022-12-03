/* eslint-disable no-unused-vars */
const Cache = require('.././cacheHandler.js');
const LanguageSchema = require('.././databaseschemas/LanguageSettingSchema.js');
const translate = require('google-translate-api');

async function ChangeServerLanguage() {

  if (Cache.has(this.ServerID)) {

    Cache.set(this.ServerID, this.Language);

  } else {

    Cache.set(this.ServerID, this.Language);

  }

  // if (await LanguageSchema.findOne({ _id: this.ServerID })) {

  //   console.log('Language already set');

  //   LanguageSchema.findOneAndUpdate({ _id: this.ServerID }, { language: this.Language });

  // } else {

  //   await new LanguageSchema({
  //     _id: this.ServerID,
  //     language: this.Language
  //   }).save();

  //   console.log('Saved new language setting');

  // }

}

module.exports = ChangeServerLanguage;

