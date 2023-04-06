
/**
 * Converts the given time into seconds.
 * @param {String} time 
 */
const parseScheduleTime = (time) => {

  const pattern = /^(\d+)([smhd])$/;
  const match = time.match(pattern);

  if (match) {

    const value = parseInt(match[1]);

    const unit = match[2];

    if (unit === 'm') {

      return value * 60;

    } else if (unit === 'h') {

      return value * 60 * 60;

    } else if (unit === 'd') {

      return value * 60 * 60 * 24;

    }

  } else {

    return null;

  }

};

const checkFormat = (text) => {

  const pattern = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

  return pattern.test(text);

};


module.exports = { parseScheduleTime, checkFormat };