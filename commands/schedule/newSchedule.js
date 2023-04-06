/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const { MessageEmbed } = require('discord.js');

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

    //This Array will hold all messages sent by the bot and by the user, so we can delete while the schedule is being created.
    const messages = [];

    //These are the strings that are shown to the user. They display whatever the user typed.
    let meetingDayString = '';
    let meetingTimeString = '';
    let reminderTimeString = '';

    //These are the strings that are used to calculate the time. They are converted to seconds.
    let devMeetingDayString = '';
    let devMeetingTimeString = '';
    let devReminderTimeString = '';

    const meetingDayEmbed = new MessageEmbed()
      .setDescription('Alright, let\'s create this schedule. First of all, in how many days does this meeting take place? Please use the `d:h:m` (day,hour,minute) format.')
      .setFooter({
        text: 'If this takes place in a day, type `1d`. Use `h` for hours and `m` for minutes'
      });

    interaction.channel.send({ embeds: [meetingDayEmbed] }).then(sentMessage => {

      const filter = m => m.author.id === interaction.member.id;

      const meetingDayCollector = sentMessage.channel.createMessageCollector({
        filter, time: 60000, max: 1
      });

      meetingDayCollector.on('collect', m => {

        const pattern = /^(\d+)([mhd])$/;
        const match = m.content.match(pattern);

        if (!match) return interaction.channel.send('Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes');

        devMeetingDayString = parseScheduleTime(m.content);
        meetingDayString = m.content;

        console.log('Collected day:', m.content);
        console.log('devMeetingDayString', devMeetingDayString);

        messages.push(sentMessage);
        messages.push(m);

        const meetingTimeEmbed = new MessageEmbed()
          .setDescription('Alright, got it,' + `**${meetingDayString}**. ` + 'When does the meeting take place on that day? Please use the `h:m` (hour,minute) format.')
          .setFooter({
            text: 'If this takes place at 8pm, type `20:00`'
          });

        sentMessage.channel.send({ embeds: [meetingTimeEmbed] }).then(sentMessage => {

          const filter = m => m.author.id === interaction.member.id;

          const meetingTimeCollector = sentMessage.channel.createMessageCollector({
            filter, time: 60000, max: 1
          });

          meetingTimeCollector.on('collect', m => {

            if (!checkFormat(m.content)) return interaction.channel.send('Please use the `h:m` (hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `m` for minutes');

            devMeetingTimeString = m.content;
            meetingTimeString = m.content;

            console.log('Collected time: ', m.content);
            console.log('devMeetingTimeString', devMeetingTimeString);

            messages.push(sentMessage);
            messages.push(m);

            const reminderTimeEmbed = new MessageEmbed()
              .setDescription(`This meeting will take place in ${meetingDayString} at ${meetingTimeString}.\n` + 'Last question: How many hours/minutes do you want to be reminded before the meeting? Please use the `h:m` (hour,minute) format.')
              .setFooter({
                text: 'If you want to be reminded an hour before , type `1h`. Use `m` for minutes'
              });

            sentMessage.channel.send({ embeds: [reminderTimeEmbed] }).then(sentMessage => {

              const filter = m => m.author.id === interaction.member.id;

              const reminderTimeCollector = sentMessage.channel.createMessageCollector({
                filter, time: 60000, max: 1
              });

              reminderTimeCollector.on('collect', m => {

                const pattern = /^(\d+)([mhd])$/;
                const match = m.content.match(pattern);

                if (!match) return interaction.channel.send('Please use the `d:h:m` (day,hour,minute) format. \nIf this takes place in an hour, type `1h`. Use `d` for days and `m` for minutes');

                reminderTimeString = m.content;
                devReminderTimeString = parseScheduleTime(m.content);

                console.log('Collected reminder: ', m.content);
                console.log('devReminderTimeString', devReminderTimeString);

                messages.push(sentMessage);
                messages.push(m);

                const successEmbed = new MessageEmbed()
                  .setTitle('Creation success!')
                  .setDescription(`Alright, got it. You will be reminded **${reminderTimeString}** before the meeting. ` + 'Now, please hold on as your schedule is created!')
                  .setColor('GREEN');

                sentMessage.channel.send({ embeds: [successEmbed] }).then(sentMessage => {

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

                  messages.push(sentMessage);
                  messages.push(m);

                  for (const message of messages) {

                    setTimeout(() => {
                      message.delete().catch((err) => {
                        console.log('Error deleting message: ', err);
                        return;
                      });
                    }, 300);

                  }

                });
              });
            });
          });
        });
      });
    });
  },
};