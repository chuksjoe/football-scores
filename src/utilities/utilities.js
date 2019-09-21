const appendLeadZero = (val) => (Number(val) > 10 ? val : `0${val}`);

export const rearrangeMatches = (matches) => {
  const newMatches = [];

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
  homeTeam = homeTeam === null ? '' : homeTeam;
  awayTeam = awayTeam === null ? '' : awayTeam;
  return `${homeTeam} - ${awayTeam}`;
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
