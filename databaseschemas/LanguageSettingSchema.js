const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const LanguageSchema = mongoose.Schema({
  _id: reqNumber,
  language: reqString,
});

module.exports = mongoose.model('server-language-settings', LanguageSchema);

// Path: databaseschemas\ServerSchema.js

console.log('Exported LanguageSettingSchema.js');