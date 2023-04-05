/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const ScheduleSnapShotSchema = require('../../databaseschemas/ScheduleSnapShotSchema.js');
const DisplaySchedule = require('../../functions/schedules/standert/DisplaySchedule.js');

//This code has been written by me, Marwin!

module.exports = {
  data: new SlashCommandBuilder()
    .setName('new-schedule')

    .setDescription('Create a Team schedule! This allows you to mention 8 people!')

    .addUserOption(option => option.setName('user-one').setDescription('Add a user to mention in the schedule!').setRequired(true))

    .addUserOption(option => option.setName('user-second').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-third').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-fourth').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-fith').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-sixth').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-seventh').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-eighth').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-nine').setDescription('Add a user to mention in the schedule!'))

    .addUserOption(option => option.setName('user-ten').setDescription('Add a user to mention in the schedule!'))

    .addStringOption(option => option.setName('scrim-time').setDescription('Time for the little timestamp inside of your schedule. If you scrim at 19 CET, write 19'))

    .addNumberOption(option => option.setName('reminder-date').setDescription('The date of the day you want to be reminded at!'))

    .addStringOption(option => option.setName('description').setDescription('This will be the description of your schedule!')),

  async execute(interaction) {

    const identifier = `${interaction.channel.parent.name}-${interaction.channel.name}`;

    const newScheduleSnapShot = new ScheduleSnapShotSchema({
      interaction: interaction,
      identifier: identifier,
      name: `${interaction.channel.parent.name}`,
      creationChannel: `${interaction.channel.name}`,
      channelID: `${interaction.channel.id}`,
      creationDate: `${interaction.createdAt}`,
      creationDateInUnix: `${Math.floor(Date.now() / 1000)}`,
      description: `${interaction.options.getString('description')}`,
      scheduleCreator: `${interaction.member}`,
      scheduleCreatorID: `${interaction.member.id}`,
      scrimTime: `${interaction.options.getString('scrim-time')}`,
      reminderDate: `${interaction.options.getNumber('reminder-date')}`,
      users: {
        userOne: `${interaction.options.getMember('user-one')}`,
        userTwo: `${interaction.options.getMember('user-second')}`,
        userThree: `${interaction.options.getMember('user-third')}`,
        userFour: `${interaction.options.getMember('user-fourth')}`,
        userFive: `${interaction.options.getMember('user-fith')}`,
        userSix: `${interaction.options.getMember('user-sixth')}`,
        userSeven: `${interaction.options.getMember('user-seventh')}`,
        userEight: `${interaction.options.getMember('user-eighth')}`,
        userNine: `${interaction.options.getMember('user-nine')}`,
        userTen: `${interaction.options.getMember('user-ten')}`,
      },
    });

    interaction.channel.send('Input recieved. This is where the user will be able to get questions about reminders and time!');

    const CheckIfScheduleExists = await ScheduleSnapShotSchema.findOne({
      identifier: `${interaction.channel.parent.name}-${interaction.channel.name}`,
    });

    if (CheckIfScheduleExists) {

      console.log('Schedule did already exist!');

      const filter = { "identifier": `${interaction.channel.parent.name}-${interaction.channel.name}` };

      const updateScheduleSnapShot = {
        interaction: interaction,
        identifier: identifier,
        name: `${interaction.channel.parent.name}`,
        creationChannel: `${interaction.channel.name}`,
        channelID: `${interaction.channel.id}`,
        creationDate: `${interaction.createdAt}`,
        creationDateInUnix: `${Math.floor(Date.now() / 1000)}`,
        description: `${interaction.options.getString('description')}`,
        scheduleCreator: `${interaction.member}`,
        scheduleCreatorID: `${interaction.member.id}`,
        scrimTime: `${interaction.options.getString('scrim-time')}`,
        reminderDate: `${interaction.options.getNumber('reminder-date')}`,
        users: {
          userOne: `${interaction.options.getMember('user-one')}`,
          userTwo: `${interaction.options.getMember('user-second')}`,
          userThree: `${interaction.options.getMember('user-third')}`,
          userFour: `${interaction.options.getMember('user-fourth')}`,
          userFive: `${interaction.options.getMember('user-fith')}`,
          userSix: `${interaction.options.getMember('user-sixth')}`,
          userSeven: `${interaction.options.getMember('user-seventh')}`,
          userEight: `${interaction.options.getMember('user-eighth')}`,
          userNine: `${interaction.options.getMember('user-nine')}`,
          userTen: `${interaction.options.getMember('user-ten')}`,
        },
      }

      await ScheduleSnapShotSchema.findOneAndUpdate(filter, updateScheduleSnapShot, { new: true }).catch((err) => {

        console.log(err);
        return interaction.reply('Something went wrong while updating the schedule!');

      });

    } else {

      console.log('Schedule did not yet exist!');

      await newScheduleSnapShot.save().catch((err) => {

        console.log(err);
        return interaction.reply('Something went wrong while creating the schedule!');

      });

    }

    console.log('Saving/updating process complete!');

    await interaction.reply('```Schedule is being created. Please wait a second...```');

    setTimeout(() => {
      interaction.deleteReply();
    }, 1000);

    DisplaySchedule(identifier, interaction.channel); //This will display the schedule in the channel

  },
};