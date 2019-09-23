import React, { Component } from 'react';

import League from './components/League';
import Loading from './components/Loading';
import {
  rearrangeMatches,
  getGameDay,
  getDay,
  getDate,
  isToday
} from './utilities/utilities';
import reloader from './assets/images/reloader-24.gif';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      leagues: [],
      error: null,
      fetchUrl: 'https://api.football-data.org/v2/matches'
    };
  }

  componentDidMount() {
    this.refresh();
    this.TimerID = setInterval(() => this.refresh(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.TimerID);
  }

  refresh = () => {
    const { fetchUrl } = this.state;
    this.fetchLeagueMatches(fetchUrl);
  };

  fetchLeagueMatches = (url) => {
    const options = {
      headers: { 'X-Auth-Token': '8648b9b0279f4b65bae72fc3bfc4d07d' }
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((response) => {
        console.log('Success....');
        const res = rearrangeMatches(response.matches);

        this.setState((prev) => ({
          leagues: res.leagues,
          error: null,
          isLoading: false
        }));
      })
      .catch((err) => {
        this.setState({ error: err, isLoading: false });
      });
  };

  setNewDate = (day) => {
    const date = getDate(day);
    const url = `https://api.football-data.org/v2/matches?dateFrom=${date}&dateTo=${date}`;
    this.fetchLeagueMatches(url);
    this.setState({ fetchUrl: url, isLoading: true });

    if (!isToday(date)) {
      clearInterval(this.TimerID);
    } else {
      this.TimerID = setInterval(() => this.refresh(), 10000);
    }
  };

  render() {
    const { leagues, isLoading, error } = this.state;
    const A_DAY = 1000 * 60 * 60 * 24;
    const leaguesComponent = leagues.map((league) => (
      // console.log(league);
      <League
        key={league.competitionId}
        league={league}
        competitionId={league.competitionId}
        competitionName={league.competitionName}
        matches={league.matches}
        matchday={league.matchday}
      />
    ));

    return (
      <>
        <div className="app-header">
          <span className="app-name">Football Scores</span>
          <span className="date">{getGameDay(new Date())}</span>
        </div>
        <div className="date-nav-bar">
          <button
            type="button"
            className="games-day"
            onClick={() => {
              this.setNewDate(-(A_DAY * 2));
            }}
          >
            {getDay(-(A_DAY * 2))}
          </button>
          <button
            type="button"
            className="games-day"
            onClick={() => {
              this.setNewDate(-A_DAY);
            }}
          >
            {getDay(-A_DAY)}
          </button>
          <button
            type="button"
            className="games-day current-day"
            onClick={() => {
              this.setNewDate(0);
            }}
          >
            Today
          </button>
          <button
            type="button"
            className="games-day"
            onClick={() => {
              this.setNewDate(A_DAY);
            }}
          >
            {getDay(A_DAY)}
          </button>
          <button
            type="button"
            className="games-day"
            onClick={() => {
              this.setNewDate(A_DAY * 2);
            }}
          >
            {getDay(A_DAY * 2)}
          </button>
        </div>
        {error ? (
          <div className="error">
            Error! Check your internet connection.
            <img src={reloader} alt="" />
          </div>
        ) : null}
        <div className="container">
          {!isLoading ? leaguesComponent : <Loading />}
        </div>
      </>
    );
  }
}
