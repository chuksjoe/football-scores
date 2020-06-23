import axios from 'axios';

export const fetchMatches = async (date = null) => {
  const dateRange = date ? `?dateFrom=${date}&dateTo=${date}` : '';
  const options = {
    url: `${process.env.REACT_APP_API_BASE_URL}/matches${dateRange}`,
    headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN }
  };
  return axios(options)
    .then((res) => res, (err) => err.response);
};

export const fetLeagueTable = async (leagueId) => {
  const options = {
    url: `${process.env.REACT_APP_API_BASE_URL}/competitions/${leagueId}/standings`,
    headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN }
  };
  return axios(options)
    .then((res) => res, (err) => err.response);
};
