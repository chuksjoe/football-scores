const genRandomString = () => {
  const charSet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
  const captchaLen = 4;
  const captcha = [];
  for (let i = 0; i < captchaLen; i += 1) {
    const index = Math.floor(Math.random() * charSet.length + 1);
    if (captcha.indexOf(charSet[index]) === -1) {
      captcha.push(charSet[index]);
    } else {
      i -= 1;
    }
  }
  return captcha.join('');
};

const appendLeadZero = (val) => (Number(val) > 10 ? val : `0${val}`);

const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'April',
  'May', 'June', 'July', 'Aug',
  'Sept', 'Oct', 'Nov', 'Dec'
];

export const rearrangeMatches = (matches) => {
  const leagues = [];

  // enter the various leagues/competitions into the new array
  for (let i = 0; i < matches.length; i++) {
    if (
      leagues.filter((le) => le.competitionId === matches[i].competition.id)
        .length < 1
    ) {
      leagues.push({
        competitionId: matches[i].competition.id,
        competitionName: matches[i].competition.name,
        matchday: matches[i].matchday
      });
    }
  }
  // enter the matches into their respective leagues
  for (let i = 0; i < leagues.length; i++) {
    const matchGroup = matches.filter(
      (match) => leagues[i].competitionId === match.competition.id
    );
    leagues[i].matches = matchGroup;
    leagues[i].rand = genRandomString();
  }
  return { count: leagues.length, leagues };
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

  return `${DAYS[date.getDay()]},
    ${appendLeadZero(date.getDate())} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getCurrentDateTime = (dateObj) => {
  const date = dateObj;
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}.
  ${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
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
