const appendLeadZero = (val) => (Number(val) > 10 ? val : `0${val}`);

export const rearrangeMatches = (matches) => {
  const newMatches = [];

  // enter the various leagues/competitions into the new array
  for (let i = 0; i < matches.length; i++) {
    if (
      newMatches.filter((le) => le.competitionId === matches[i].competition.id)
        .length < 1
    ) {
      newMatches.push({
        competitionId: matches[i].competition.id,
        competitionName: matches[i].competition.name,
        matchday: matches[i].matchday
      });
    }
  }
  // enter the matches into their respective leagues
  for (let i = 0; i < newMatches.length; i++) {
    const matchGroup = matches.filter(
      (match) => newMatches[i].competitionId === match.competition.id
    );
    newMatches[i].matches = matchGroup;
  }
  return { count: newMatches.length, leagues: newMatches };
};

export const formatScore = (score) => {
  let { fullTime: { homeTeam, awayTeam } } = score;
  return homeTeam === null ? '_' : `${homeTeam} - ${awayTeam}`;
};

export const formatStatus = (status) => {
  switch (status) {
  case 'SCHEDULED': return '';
  case 'IN_PLAY': return ' In Play';
  case 'FINISHED': return ' Finished';
  case 'PAUSED': return ' Half-time';
  default: return 'Invalid';
  }
};

/**
 * recieve a date-time string and return date
 * @param {String} dateString
 * @returns {String} Format: Tues, 24 Sept 2019
 */
export const getGameDay = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = [
    'Jan', 'Feb', 'Mar', 'April',
    'May', 'June', 'July', 'Aug',
    'Sept', 'Oct', 'Nov', 'Dec'
  ];
  return `${days[date.getDay()]},
    ${appendLeadZero(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * recieve a date-time string and return time
 * @param {String} dateString
 * @returns {String} Format: 12:33PM
 */
export const getGameTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * recieve day count from today and return the date of that day
 * @param {Integer} dayCount
 * @returns {String} Format: 23/09
 */
export const getDay = (dayCount) => {
  const A_DAY = 86400000; // 1000mills * 60s * 60m * 24hr;
  const day = new Date(new Date().getTime() + A_DAY * dayCount);
  return `${appendLeadZero(day.getDate())} /
    ${appendLeadZero(day.getMonth() + 1)}`;
};

/**
 * recieve day count from today in milliseconds and return the date of that day
 * @param {Integer} millis
 * @returns {String} Format: 2019-07-21
 */
export const getDate = (millis) => {
  const day = new Date(new Date().getTime() + millis);
  return `${day.getFullYear()}-${appendLeadZero(day.getMonth() + 1)}-${appendLeadZero(day.getDate())}`;
};

/**
 * recieve a date value and return true if the date is today. Otherwise, false.
 * @param {String} date
 * @returns {Boolean}
 */
export const isToday = (date) => {
  const theDate = new Date(date);
  const today = new Date();
  return today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0);
};
