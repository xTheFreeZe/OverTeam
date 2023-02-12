const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const {
  MessageActionRow,
  MessageButton,
  MessageEmbed
} = require('discord.js');

const fs = require('fs');
const nodeCron = require('node-cron');
const timestamp = require('unix-timestamp');

const {FindArrayToUpdate, CreateScheduleReminderMessage} = require('../../functions/functions.js');

const SchedulePresetSchema = require('../../databaseschemas/SchedulePresetSchema.js');
const CreateNewPreset = require('../../functions/Schedules/CreateNewPreset.js');

//This code has been written by me, Marwin!

module.exports = {
  data: new SlashCommandBuilder()
      .setName('schedule-test')

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

      .addNumberOption(option => option.setName('scrim-time').setDescription('Time for the little timestamp inside of your schedule. If you scrim at 19 CET, write 19'))

      .addNumberOption(option => option.setName('reminder-date').setDescription('The date of the day you want to be reminded at!'))

      .addStringOption(option => option.setName('description').setDescription('This will be the description of your schedule!')),

  async execute(interaction) {

    // if (interaction.member.id !== "420277395036176405") {

    //   interaction.reply({
    //     content: "This command is currently unavailable! We are very sorry. If possible, try using weekly schedules, or a preset.",
    //     ephemeral: true
    //   });

    //   return;

    // }

    let AllUsersWithEmojis = [];

    let YesVoters = [];

    let WillNotPingArray = [];

    let Check_User_Array = [];

    let User_One_Array = [];

    let User_Second_Array = [];

    let User_Third_Array = [];

    let User_Fourth_Array = [];

    let User_Fith_Array = [];

    let User_Sixth_Array = [];

    let User_Seventh_Array = [];

    let User_Eighth_Array = [];

    let User_Ninth_Array = [];

    let User_Tenth_Array = [];

    let ScrimDescripton = [];

    let MentionMessage = [];

    const PresetSchedulePath = `./Schedule_${interaction.channel.parent.name}.json`;

    /**
     * This is the boolean used for status updates. If true, the author of the schedule will recieve updates everytime someone reacted!
     * @type {boolean}
     */
    let StatusUpdates = false;

    /**
     * This boolean is used to check if the schedule has been deleted or not.
     * @type {boolean}
     */
    let HasBeenDeleted = false;

    /**
     * @type {number}
     * This will be used as the hour to calculate the unix timestamp!
     */
    let UnixTime = 20;

    /**
     * @type {number}
     * This will be used as the day to calculate the unix timestamp!
     */
    let UnixDay = new Date().getDate();

    /**
     * @type {string} - 1-8 All users mentioned in the schedule.
     */
    const userOne = interaction.options.getMember('user-one');

    const userSecond = interaction.options.getMember('user-second');

    const userThird = interaction.options.getMember('user-third');

    const userFourth = interaction.options.getMember('user-fourth');

    const userFith = interaction.options.getMember('user-fith');

    const userSixth = interaction.options.getMember('user-sixth');

    const userSeventh = interaction.options.getMember('user-seventh');

    const userEighth = interaction.options.getMember('user-eighth');

    const userNinth = interaction.options.getMember('user-nine');

    const userTenth = interaction.options.getMember('user-ten');

    const ScrimTime = interaction.options.getNumber('scrim-time');

    let ReminderDay = interaction.options.getNumber('reminder-date');

    const OptionalScrimDescription = interaction.options.getString('description');

    if (ReminderDay) { //checks if date is valid
      if (isNaN(ReminderDay)) return interaction.reply('The reminder date field must be a number! - 17 for sending it on the 17th of the month!');
      if (ReminderDay > 31) return interaction.reply('Please enter a number less than or equal to 31 for the reminder date!');
      const result = (ReminderDay - Math.floor(ReminderDay)) !== 0;
      if (result) return interaction.reply('Please enter a valid number for the reminder date field!');
    } else {
      ReminderDay = "*";
    }

    const reminderschedule = nodeCron.schedule(`45 18 * * *`, () => {

      CreateScheduleReminderMessage(AllUsersWithEmojis, WillNotPingArray, interaction.channel);

    }, {
      scheduled: false
    });

    var closereminders = nodeCron.schedule(`47 18 * * *`, () => { //47 17 * * * This cron schedule deletes the reminders after the scrim has ended so it's not sent twice.
      reminderschedule.stop();
      remindercreator.stop();
    }, {
      scheduled: false
    });

    var customreminder = nodeCron.schedule(`45 18 ${ReminderDay} * *`, () => { // 45 17 ${ReminderDay} * *- Set a cron schedule for the bot to send reminders to the users.
      for (let i = 0; i < AllUsersWithEmojis.length; i++) {

        if (AllUsersWithEmojis[i].includes(`<:2ez_Schedule_Yes:933802728130494524>`)) {

          if (YesVoters.includes(AllUsersWithEmojis[i])) {

            YesVoters.push("");

          } else {

            YesVoters.push(AllUsersWithEmojis[i]);

          }

        }

      }

      let RealReminder = YesVoters.toString().replace(/<:2ez_Schedule_Yes:933802728130494524>/g, '').replace(/,/g, ' ').replace(`${WillNotPingArray}`, '').replace(/,/g, '').trim();

      if (RealReminder.length == 0) {

        console.log('Reminder was not sent because either no users were mentioned or no users voted yes!');

      } else {

        interaction.channel.send(`${RealReminder} here is your reminder for the scrim in 15 minutes!`);

      }

    }, {
      scheduled: false
    });

    var stopcustomreminder = nodeCron.schedule(`47 18 ${ReminderDay} * *`, () => { //` 47 17 ${ReminderDay} * * - Set a cron schedule for the bot to send reminders to the users.
      customreminder.stop();
    }, {
      scheduled: false
    });
    // -------------------------------------------------- Reminder Schedules --------------------------------------------------//

    // -------------------------------------------------- Unix timestamp --------------------------------------------------//
    timestamp.round = true; //Round the timestamp so we don't get fractions of a second
    const event = new Date();
    // -------------------------------------------------- Unix timestamp --------------------------------------------------//

    if (ReminderDay !== "*") { //only runs if date isn't default

      customreminder.start();
      stopcustomreminder.start();

      UnixDay = ReminderDay;

      interaction.member.send('You have set a custom reminder date! Note that all other reminders except the scrim reminder have been turned off.');
      console.log(`Started custom reminder! - Day: ${ReminderDay}!`);

      reminderschedule.stop();
      closereminders.stop();
      remindercreator.stop();

    } else {

      console.log('Never initalized custom reminder!');

      if (new Date().getHours() >= 19) {

        console.log('Past scrim time, setting unix day for next day');
        UnixDay = new Date().getDate() + 1;

      }
    }

    const StopAllReminders = () => {

      console.log('Stopped all reminders!');

      closereminders.stop();

      reminderschedule.stop();

      customreminder.stop();

      stopcustomreminder.stop();

    };

    if (ScrimTime) {
      UnixTime = ScrimTime;
    }

    event.setDate(UnixDay);
    event.setHours(`${UnixTime - 1}`, 0, 0, 0); //Lower the time by 2 hours to get the correct time

    try {

      ScrimDescripton.push(OptionalScrimDescription);

    } catch (e) {

      console.log(e);
      ScrimDescripton.push('React to change your availability!');

    }

    if (OptionalScrimDescription == ">" || !OptionalScrimDescription) {

      ScrimDescripton.push("React to change your availability!");

    }

    let yesEmoji = "<:OverTeam_Yes:1074131419535777884>";
    let noEmoji = "<:OverTeam_No:1074131594593452134>";
    let neutralEmoji = "<:OverTeam_Neutral:1074132245696233573>";
    let tentativeEmoji = "<:OverTeam_Tentative:1074131651132666017>";

    try { //Push in every user + their emoji in their personal array

      if (userOne) {

        //Push everything in, if a user was mentioned

        Check_User_Array.push(userOne.user.id);
        User_One_Array.push(`${neutralEmoji} ${userOne}`);
        MentionMessage.push(`${userOne}`);

      } else {

        // else, push in a "-"

        User_One_Array.push('')

      }

      if (userSecond) {

        Check_User_Array.push(userSecond.user.id);
        User_Second_Array.push(`${neutralEmoji} ${userSecond}`);
        MentionMessage.push(`${userSecond}`);

      } else {

        User_Second_Array.push('')

      }

      if (userThird) {

        Check_User_Array.push(userThird.user.id);
        User_Third_Array.push(`${neutralEmoji} ${userThird}`);
        MentionMessage.push(`${userThird}`);

      } else {

        User_Third_Array.push('');

      }

      if (userFourth) {

        Check_User_Array.push(userFourth.user.id);
        User_Fourth_Array.push(`${neutralEmoji} ${userFourth}`);
        MentionMessage.push(`${userFourth}`);

      } else {

        User_Fourth_Array.push('')

      }

      if (userFith) {

        Check_User_Array.push(userFith.user.id);
        User_Fith_Array.push(`${neutralEmoji} ${userFith}`);
        MentionMessage.push(`${userFith}`);

      } else {

        User_Fith_Array.push('')

      }

      if (userSixth) {

        Check_User_Array.push(userSixth.user.id);
        User_Sixth_Array.push(`${neutralEmoji} ${userSixth}`);
        MentionMessage.push(`${userSixth}`);

      } else {

        User_Sixth_Array.push('');

      }

      if (userSeventh) {

        Check_User_Array.push(userSeventh.user.id);
        User_Seventh_Array.push(`${neutralEmoji} ${userSeventh}`);
        MentionMessage.push(`${userSeventh}`);

      } else {

        User_Seventh_Array.push('')

      }

      if (userEighth) {

        Check_User_Array.push(userEighth.user.id);
        User_Eighth_Array.push(`${neutralEmoji} ${userEighth}`);
        MentionMessage.push(`${userEighth}`);

      } else {

        User_Eighth_Array.push('')

      }

      if (userNinth) {

        Check_User_Array.push(userNinth.user.id);
        User_Ninth_Array.push(`${neutralEmoji} ${userNinth}`);
        MentionMessage.push(`${userNinth}`);

      } else {

        User_Ninth_Array.push('')

      }

      if (userTenth) {

        Check_User_Array.push(userTenth.user.id);
        User_Tenth_Array.push(`${neutralEmoji} ${userTenth}`);
        MentionMessage.push(`${userTenth}`);

      } else {

        User_Tenth_Array.push('')

      }

      Check_User_Array.push(interaction.member.user.id);

      console.log(`Pushed all users in ${interaction.channel.parent.name}!`);

    } catch (e) {

      interaction.reply({
        content: "Oops, something went wrong! Please try again!",
      })
      console.log(e);
      return;

    }

    // ⬇ Description of the embed
    let UserMessages =
        (`> ${ScrimDescripton.toString().replace(/,/g, '')}

      ⏰ <t:${timestamp.fromDate(event)}:R>

			${User_One_Array.toString()}

			${User_Second_Array.toString()}

			${User_Third_Array.toString()}

			${User_Fourth_Array.toString()}

			${User_Fith_Array.toString()}

			${User_Sixth_Array.toString()}

			${User_Seventh_Array.toString()}

			${User_Eighth_Array.toString()}
			
			${User_Ninth_Array.toString()}
			
			${User_Tenth_Array.toString()}`);

    let team = `${interaction.channel.parent.name}`; // get category name

    const ScheduleEmbed = new MessageEmbed()
        .setTitle(`${team}'s Schedule`)
        .setDescription(UserMessages)
        .setColor('GREYPLE')
        .setFooter({
          text: `Created by ${interaction.member.user.username}`
        })
        .setTimestamp();

    const NotAbleToReactEmbed = new MessageEmbed()
        .setDescription(`> Your User ID doesn't appear in the following Array: SCHEDULE_USER_ID_ARRAY `)
        .setColor('DARK_BUT_NOT_BLACK')

    const NotAbleToDeleteEmbed = new MessageEmbed()
        .setDescription(`> Only the creator of this schedule , ${interaction.member.user.username}, can use this!`)
        .setColor('DARK_BUT_NOT_BLACK')

    const DisableReminderForEveryoneEmbed = new MessageEmbed()
        .setDescription(`<:2ez_Schedule_Yes:933802728130494524> I won't send a reminder for this schedule!`)
        .setColor('GREEN');

    const DisableReminderForYouEmbed = new MessageEmbed()
        .setDescription(`<:2ez_Schedule_Yes:933802728130494524> I won't ping you for this schedule!`)
        .setColor('GREEN');

    const EnableUpdateMessagesEmbed = new MessageEmbed()
        .setDescription(`<:2ez_Schedule_Yes:933802728130494524> I will send you a message every time someone changes their availability!`)
        .setColor('GREEN');

    const SuccessfullyDeletedEmbed = new MessageEmbed()
        .setDescription(`<:2ez_Schedule_Yes:933802728130494524> Your schedule has been deleted!`)
        .setFooter({
          text: "All running reminders have been stopped!"
        })
        .setColor('GREEN');

    const Buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ButYes')
                .setEmoji('<:OverTeam_Yes:1074131419535777884>')
                .setStyle('SECONDARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButNo')
                .setEmoji('<:OverTeam_No:1074131594593452134>')
                .setStyle('SECONDARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButIdk')
                .setEmoji('<:OverTeam_Tentative:1074131651132666017>')
                .setStyle('SECONDARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButDelete')
                .setLabel('Delete')
                .setStyle("DANGER")
        );

    const Options = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ButSave')
                .setLabel('Save this schedule')
                .setStyle('SUCCESS'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButPlayerLate')
                .setLabel("I'll be late")
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButManageReminder')
                .setLabel('Manage reminder')
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ButManageUpdates')
                .setLabel('Turn on status updates')
                .setStyle('PRIMARY'),
        );

    await interaction.reply(`Here is your schedule for the following users: ${MentionMessage}`).then(
        interaction.channel.send({
          embeds: [
            ScheduleEmbed
          ],
          components: [
            Buttons
          ]

        }).then(sentMessage => {

          const ScheduleMessage = sentMessage;

          const ReactionCollector = sentMessage.createMessageComponentCollector({
            componentType: 'BUTTON'
          });

          const OptionButtonCollector = sentMessage.createMessageComponentCollector({
            componentType: 'BUTTON'
          });

          const DeleteCollector = sentMessage.createMessageComponentCollector({
            componentType: 'BUTTON'
          });

          interaction.channel.send({
            content: 'Schedule options',
            components: [
              Options
            ],
          });

          ReactionCollector.on('collect', i => {

            const IgnoreButtons = new RegExp(`^(ButDelete)$`); //Ignore the buttons we don't need

            if (IgnoreButtons.test(i.customId)) return;

            if (!Check_User_Array.includes(i.user.id)) {
              i.reply({
                content: "You are not able to react here!",
                embeds: [
                  NotAbleToReactEmbed
                ],
                ephemeral: true
              })
              return;
            }

            let EmojiReaction = ('');
            let EmbedColor = ('');

            if (i.customId.toString().includes('ButYes')) {
              EmojiReaction = `${yesEmoji}`;
              EmbedColor = 'GREEN';
            } else if (i.customId.toString().includes("ButNo")) {
              EmojiReaction = `${noEmoji}`;
              EmbedColor = 'RED';
            } else if (i.customId.toString().includes("ButIdk")) {
              EmojiReaction = `${tentativeEmoji}`;
              EmbedColor = 'BLURPLE';
            }

            AllUsersWithEmojis.length = 0;

            try {

              if (i.member.user.id == userOne.user.id) {

                User_One_Array.pop();
                User_One_Array.push(`${EmojiReaction} ${userOne}`)

              }

              if (i.member.user.id == userSecond.user.id) {

                User_Second_Array.pop();
                User_Second_Array.push(`${EmojiReaction} ${userSecond}`)

              }

              if (i.member.user.id == userThird.user.id) {

                User_Third_Array.pop();
                User_Third_Array.push(`${EmojiReaction} ${userThird}`)

              }

              if (i.user.id == userFourth.user.id) {

                User_Fourth_Array.pop();
                User_Fourth_Array.push(`${EmojiReaction} ${userFourth}`)

              }

              if (i.user.id == userFith.user.id) {

                User_Fith_Array.pop();
                User_Fith_Array.push(`${EmojiReaction} ${userFith}`)

              }

              if (i.user.id == userSixth.user.id) {

                User_Sixth_Array.pop();
                User_Sixth_Array.push(`${EmojiReaction} ${userSixth}`)

              }

              if (i.user.id == userSeventh.user.id) {

                User_Seventh_Array.pop();
                User_Seventh_Array.push(`${EmojiReaction} ${userSeventh}`)

              }

              if (i.user.id == userEighth.user.id) {

                User_Eighth_Array.pop();
                User_Eighth_Array.push(`${EmojiReaction} ${userEighth}`)

              }

              // eslint-disable-next-line no-empty
            } catch {

            }

            AllUsersWithEmojis.push(User_One_Array.toString(), User_Second_Array.toString(), User_Third_Array.toString(), User_Fourth_Array.toString(), User_Fith_Array.toString(), User_Sixth_Array.toString(), User_Seventh_Array.toString(), User_Eighth_Array.toString(), User_Ninth_Array.toString(), User_Tenth_Array.toString());

            if (StatusUpdates) {

              interaction.member.send(`${i.member.user.username} reacted with ${EmojiReaction} to your schedule in ${interaction.channel}!`).catch(err => {
                console.log('Was not able to send status update', err);
              });

            }

            ScheduleEmbed.setDescription(ScrimDescripton.toString().replace(/,/g, '') + "\n" + "\n" + `⏰ <t:${timestamp.fromDate(event)}:R>` + "\n" + "\n" + User_One_Array.toString() + "\n" + "\n" + User_Second_Array.toString() + "\n" + "\n" + User_Third_Array.toString() + "\n" + "\n" + User_Fourth_Array.toString() + "\n" + "\n" + User_Fith_Array.toString() + "\n" + "\n" + User_Sixth_Array.toString() + "\n" + "\n" + User_Seventh_Array.toString() + "\n" + "\n" + User_Eighth_Array.toString() + "\n" + "\n" + User_Ninth_Array.toString() + "\n" + "\n" + User_Tenth_Array.toString());
            ScheduleEmbed.setColor(EmbedColor);
            ScheduleEmbed.setFooter({
              text: `Created by ${interaction.member.user.username} | Latest reaction by ${i.user.username}`
            });
            ScheduleEmbed.setTimestamp();

            sentMessage.edit({
              embeds: [
                ScheduleEmbed
              ],
            });
            i.deferUpdate();

            if (i.customId === "ButSave") {

              if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

              if (i.user.id !== interaction.member.user.id) {
                i.reply({
                  content: "You are not able to use this!",
                  embeds: [
                    NotAbleToDeleteEmbed
                  ],
                })
                return;
              }

              const presetData = {
                name: `${interaction.channel.parent.name}`,
                creationChannel: `${interaction.channel.name}`,
                channelID: `${interaction.channel.id}`,
                creationDate: `${Date.now()}`,
                description: `${ScrimDescripton.toString().replace(/,/g, '')}`,
                scheduleCreator: `${interaction.member}`,
                scheduleCreatorID: `${interaction.member.id}`,
                users: {
                  userOne: `${User_One_Array}`,
                  userSecond: `${User_Second_Array}`,
                  userThird: `${User_Third_Array}`,
                  userFourth: `${User_Fourth_Array}`,
                  userFifth: `${User_Fith_Array}`,
                  userSixth: `${User_Sixth_Array}`,
                  userSeventh: `${User_Seventh_Array}`,
                  userEighth: `${User_Eighth_Array}`,
                  userNinth: `${User_Ninth_Array}`,
                  userTenth: `${User_Tenth_Array}`,
                },
              };

              CreateNewPreset(presetData);

            }

            if (i.customId === "ButManageReminder") {

              if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

              if (!Check_User_Array.includes(i.user.id)) {
                i.reply({
                  content: "You are not able to use this!",
                  embeds: [
                    NotAbleToReactEmbed
                  ],
                  ephemeral: true
                })
                return;
              }

              const ReminderOptions = new MessageActionRow()
                  .addComponents(
                      new MessageButton()
                          .setCustomId('ButDisableReminderForYou')
                          .setLabel('Disable for you')
                          .setStyle('DANGER'),
                  )
                  .addComponents(
                      new MessageButton()
                          .setCustomId('ButDisableReminderForEveryone')
                          .setLabel('Disable for everyone')
                          .setStyle('DANGER'),
                  );

              i.channel.send({
                content: "What do you want to do?",
                components: [
                  ReminderOptions
                ],
              }).then(sentMessage => {

                const DisableReminderForYou = sentMessage.createMessageComponentCollector({
                  componentType: 'BUTTON'
                });

                const DisableReminderForEveryone = sentMessage.createMessageComponentCollector({
                  componentType: 'BUTTON'
                });

                DisableReminderForYou.on('collect', async i => {

                  if (i.customId === 'ButDisableReminderForYou') {

                    if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

                    WillNotPingArray.push(`${i.user}`);

                    console.log(`${i.user.username} wont be notified for this schedule!`);

                    i.reply({
                      embeds: [
                        DisableReminderForYouEmbed
                      ]
                    });

                  }

                });

                DisableReminderForEveryone.on('collect', async i => {

                  if (i.customId === "ButDisableReminderForEveryone") {

                    if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

                    if (i.user.id !== interaction.member.user.id) {
                      i.reply({
                        content: "You are not able to use this!",
                        embeds: [
                          NotAbleToDeleteEmbed
                        ],
                      })
                      return;
                    }

                    console.log(`${i.user.username} has disabled the reminder for everyone!`);

                    try {

                      reminderschedule.stop();
                      closereminders.stop();
                      customreminder.stop();
                      stopcustomreminder.stop();

                    } catch (e) {

                      i.reply("Something went wrong! Please try again! If this error doesn't go away, please contact the developer!");
                      console.log(`Something went wrong! Error: ${e}`);
                      return;

                    }

                    i.reply({
                      embeds: [
                        DisableReminderForEveryoneEmbed
                      ],
                    });
                  }

                });
              });
              i.deferUpdate();
            }

            if (i.customId === "ButManageUpdates") {

              if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

              if (i.user.id !== interaction.member.user.id) {
                i.reply({
                  content: "You are not able to use this!",
                  embeds: [
                    NotAbleToDeleteEmbed
                  ]
                })
                return;
              }

              StatusUpdates = true;

              console.log(`${i.user.username} has enabled the status updates!`);

              i.reply({
                embeds: [
                  EnableUpdateMessagesEmbed
                ]
              });
            }

            if (i.customId === "ButPlayerLate") {

              if (HasBeenDeleted) return i.reply('This schedule has already been deleted!');

              i.channel.send({
                content: "\nAlright, please type the time at which you will be there (this will go in the description of the schedule). \nThe schedule will be updated when you type something or the message times out (2 minutes). \nPlease type the time in the following format: `HH:MM \n\nYou got 2 minutes until this message times out.`",
              }).then(sentMessage => {

                const Filter = Check_User_Array.includes(i.user.id);

                const DelayCollector = sentMessage.channel.createMessageCollector({
                  Filter, time: 120000, max: 1
                });

                let UserInput = ("");
                let TimeAuthor = ("");

                DelayCollector.on('collect', async m => {

                  if (!m.content.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) { //Using this regex, we can check if the input follows the HH:MM format

                    m.reply({
                      content: "Please type the time in the following format: `HH:MM`",
                    });
                    return;

                  }

                  m.react('✅');
                  UserInput = m.content;
                  TimeAuthor = `${m.author}`;

                });

                // eslint-disable-next-line no-unused-vars
                DelayCollector.on('end', collected => {

                  if (HasBeenDeleted) return i.channel.send('Something went wrong. This schedule has already been deleted!');

                  if (!UserInput) return;

                  ScheduleEmbed.setDescription(ScrimDescripton.toString().replace(/,/g, '') + "\n" + "\n" + `⏰ <t:${timestamp.fromDate(event)}:R>` + "\n" + "\n" + FindArrayToUpdate(User_One_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Second_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Third_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Fourth_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Fith_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Sixth_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Seventh_Array, TimeAuthor, UserInput) + "\n" + "\n" + FindArrayToUpdate(User_Eighth_Array, TimeAuthor, UserInput));
                  ScheduleEmbed.setColor('DARK_NAVY');
                  ScheduleEmbed.setFooter({
                    text: `Created by ${interaction.member.user.username} | Latest change by ${i.user.username}`
                  });
                  ScheduleEmbed.setTimestamp();

                  ScheduleMessage.edit({
                    embeds: [
                      ScheduleEmbed
                    ],
                  });

                  i.channel.send(`Got it, the schedule should be updated in a few seconds -> Your time: **${UserInput ? UserInput : "Error when collecting [Error: 20]"}**`);

                });

                i.deferUpdate();

              });
            }

          });

          DeleteCollector.on('collect', async (i) => {

            if (i.customId === "ButDelete") {

              if (i.user.id !== interaction.member.user.id) {
                i.reply({
                  content: "You are not able to use this!",
                  embeds: [
                    NotAbleToDeleteEmbed
                  ],
                  ephemeral: true
                })
                return;
              }

              try {

                User_One_Array.pop();

                User_Second_Array.pop();

                User_Third_Array.pop();

                User_Fourth_Array.pop();

                User_Fith_Array.pop();

                User_Sixth_Array.pop();

                User_Seventh_Array.pop();

                User_Eighth_Array.pop();

                User_Ninth_Array.pop();

                User_Tenth_Array.pop();

                ScrimDescripton.pop();

                MentionMessage.pop();

                closereminders.stop();

                reminderschedule.stop();

                customreminder.stop();

                stopcustomreminder.stop();

              } catch {

                const embed = new MessageEmbed()
                    .setDescription('Error ID: `BAD_ARRAY_POP / 9 ` Contact the Dev if you see this!')
                    .setColor('RED');

                i.reply({
                  content: 'Something went wrong...!',
                  embeds: [
                    embed
                  ],
                  ephemeral: true
                });
                return;
              }

              HasBeenDeleted = true;

              sentMessage.delete().catch(() => {

                console.log('Error ID: 10');

              });

              interaction.deleteReply().catch(() => {

                console.log('Error ID: 11 | Interaction could not be deleted!');

              });

              console.log(`Schedule in ${interaction.channel.parent.name} got deleted!`);

              i.reply({
                embeds: [
                  SuccessfullyDeletedEmbed
                ],
                ephemeral: true,
              });
            }
          });
        }),
    );
  },
};