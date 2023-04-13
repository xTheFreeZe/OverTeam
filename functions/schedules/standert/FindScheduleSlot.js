
/**
 * This function loops through the users and reactions and updates the slot of the clickedUser with the clickedReaction.
 * It then returns the updated index of the clickedUser in the users array.
 * @param {String} clickedUser - The user whose schedule slot was clicked
 * @param {Array} users - The array of users
 * @returns {Number} - The updated index of the clickedUser in the users array
 */
const FindScheduleSlot = (clickedUser, users) => {

  const userArray = Object.values(users);
  const userIndex = userArray.indexOf(clickedUser);

  console.log('User index:', userIndex);

  if (userIndex === -1) {

    // user not found in users array

    return null;

  }

  return userIndex;

};


module.exports = FindScheduleSlot;