
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


module.exports = parseScheduleTime;