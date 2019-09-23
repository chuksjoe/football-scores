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

export const getGameTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const getDay = (days) => {
  const day = new Date(new Date().getTime() + days);
  return `${appendLeadZero(day.getDate())} / ${day.getMonth() + 1}`;
};

export const getDate = (days) => {
  const day = new Date(new Date().getTime() + days);
  return `${day.getFullYear()}-${appendLeadZero(day.getMonth() + 1)}-${appendLeadZero(day.getDate())}`;
};

export const isToday = (date) => {
  const theDate = new Date(date);
  const today = new Date();
  return today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0);
};
