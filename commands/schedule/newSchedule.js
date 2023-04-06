/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const { parseScheduleTime, checkFormat } = require('../../functions/schedules/standert/CheckScheduleTimes.js');
const saveScheduleTODB = require('../../functions/schedules/standert/SaveScheduleToDB.js');

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

    .addStringOption(option => option.setName('description').setDescription('This will be the description of your schedule!')),

  async execute(interaction) {

    const identifier = `${interaction.channel.parent.name}-${interaction.channel.name}`;
    interaction.reply('Hello, please answer the following questions: \n**If you want to cancel, type `cancel`** \n\n');

    //These are the strings that are shown to the user. They display whatever the user typed.
    let meetingDayString = '';
    let meetingTimeString = '';
    let reminderTimeString = '';

    //These are the strings that are used to calculate the time. They are converted to seconds.
    let devMeetingDayString = '';
    let devMeetingTimeString = '';
    let devReminderTimeString = '';

    interaction.channel.send('Alright, let\'s create this schedule. First of all, in how many days does this meeting take place? Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes').then(sentMessage => {

      const meetingDayCollector = sentMessage.channel.createMessageCollector({
        time: 60000, max: 1
      });

      meetingDayCollector.on('collect', m => {

        const pattern = /^(\d+)([mhd])$/;
        const match = m.content.match(pattern);

        if (m.author.id !== interaction.user.id) return interaction.channel.send('Wrong person buddy!');
        if (!match) return interaction.channel.send('Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes');

        devMeetingDayString = parseScheduleTime(m.content);
        meetingDayString = m.content;

        console.log('Collected day:', m.content);
        console.log('devMeetingDayString', devMeetingDayString);

        sentMessage.channel.send('Alright, got it,' + `**${meetingDayString}**. ` + 'When does the meeting take place on that day? Please use the `h:m` (hour,minute) format. \nIf this takes place at 8pm, type `20:00`').then(sentMessage => {

          const meetingTimeCollector = sentMessage.channel.createMessageCollector({
            time: 60000, max: 1
          });

          meetingTimeCollector.on('collect', m => {

            if (m.author.id !== interaction.user.id) return interaction.channel.send('Wrong person buddy!');
            if (!checkFormat(m.content)) return interaction.channel.send('Please use the `h:m` (hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `m` for minutes');

            devMeetingTimeString = m.content;
            meetingTimeString = m.content;

            console.log('Collected time: ', m.content);
            console.log('devMeetingTimeString', devMeetingTimeString);

            sentMessage.channel.send(`Takes place in **${meetingDayString}** at **${meetingTimeString}**. ` + 'Last question: How many hours/minutes do you want to be reminded before the meeting? \nPlease use the `h:m` (hour,minute) format. \nIf you want to be reminded an hour before , type `1h`. Use `m` for minutes').then(sentMessage => {

              const reminderTimeCollector = sentMessage.channel.createMessageCollector({
                time: 60000, max: 1
              });

              reminderTimeCollector.on('collect', m => {

                const pattern = /^(\d+)([mhd])$/;
                const match = m.content.match(pattern);

                if (m.author.id !== interaction.user.id) return interaction.channel.send('Wrong person buddy!');
                if (!match) return interaction.channel.send('Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes');

                reminderTimeString = m.content;
                devReminderTimeString = parseScheduleTime(m.content);

                console.log('Collected reminder: ', m.content);
                console.log('devReminderTimeString', devReminderTimeString);

                sentMessage.channel.send(`Alright, got it. You will be reminded **${reminderTimeString}** before the meeting. ` + 'Now, please hold on as your schedule is created!').then(sentMessage => {

                  const obj = {
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
                    meetingDay: `${devMeetingDayString}`,
                    meetingTime: `${devMeetingTimeString}`,
                    reminderDate: `${devReminderTimeString}`,
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

                  saveScheduleTODB(identifier, interaction.channel, obj); //Send the data over to this function to save it to the database.

                });
              });
            });
          });
        });
      });
    });
  },
};