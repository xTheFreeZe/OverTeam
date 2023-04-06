/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const ScheduleSnapShotSchema = require('../../databaseschemas/ScheduleSnapShotSchema.js');
const DisplaySchedule = require('../../functions/schedules/standert/DisplaySchedule.js');
const parseScheduleTime = require('../../functions/schedules/standert/parseScheduleTime.js');

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

    interaction.reply('Hello, please answer the following questions. \nIf you want to cancel, type `cancel`');

    //These are the strings that are shown to the user. They display whatever the user typed.
    let meetingDayString = '';
    let meetingTimeString = '';
    let reminderTimeString = '';

    //These are the strings that are used to calculate the time. They are converted to seconds.
    let devMeetingDayString = '';
    let devMeetingTimeString = '';
    let devReminderTimeString = '';

    interaction.channel.send('Alright, let\'s create this schedule. First of all, in how many days does this meeting take place? \nPlease use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes').then(sentMessage => {

      const meetingDayCollector = sentMessage.channel.createMessageCollector({
        time: 60000, max: 1
      });

      meetingDayCollector.on('collect', m => {

        const pattern = /^(\d+)([mhd])$/;
        const match = m.content.match(pattern);

        if (!match) return interaction.channel.send('Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes');

        devMeetingDayString = parseScheduleTime(m.content);
        meetingDayString = m.content;

        console.log('Collected', m.content);
        console.log('devMeetingDayString', devMeetingDayString);

        sentMessage.channel.send('Alright, got it,' + `**${meetingDayString}**. ` + 'Now in how many hours does this meeting take place? \nPlease use the `h:m` (hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `m` for minutes').then(sentMessage => {

          const meetingTimeCollector = sentMessage.channel.createMessageCollector({
            time: 60000, max: 1
          });

          meetingTimeCollector.on('collect', m => {



          });

        });

      });

      return;

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

      DisplaySchedule(identifier, interaction.channel); //This will display the schedule in the channel

    },
};