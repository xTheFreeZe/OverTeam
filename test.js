const CreateNewPreset = require('./functions/Schedules/CreateNewPreset.js');

const playerData = {
  userOne: 'Marwin',
  userTwo: 'Flo',
};

const presetData = {
    name: 'Test',
    channelID: 123456789,
};

CreateNewPreset(presetData, playerData);