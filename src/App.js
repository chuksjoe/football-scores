/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import League from './components/League';
import Loading from './components/Loading';
import { rearrangeMatches, getGameDay } from './utilities/utilities';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      leagues: [],
      error: null
    };
  }

  componentDidMount() {
    this.TimerID = setInterval(() => this.refresh(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.TimerID);
  }

  refresh() {
    this.fetchLeagueMatches();
  }

  fetchLeagueMatches() {
    const options = {
      headers: { 'X-Auth-Token': '8648b9b0279f4b65bae72fc3bfc4d07d' }
    };
    fetch('https://api.football-data.org/v2/matches', options)
      .then((res) => res.json())
      .then((response) => {
        console.log('Success....');
        const res = rearrangeMatches(response.matches);
        const {
          filters: { dateFrom }
        } = response;
        const leaguesRow = res.leagues.map((league) => (
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
        this.setState({ leagues: leaguesRow, isLoading: false });
      })
      .catch((err) => {
        this.setState({ error: err, isLoading: false });
      });
  }

  render() {
    const { leagues, isLoading, error } = this.state;

    return (
      <>
        <div className="app-header">
          <span className="app-name">Football Scores</span>
          <span className="date">{getGameDay(new Date())}</span>
        </div>
        {error ? <p className="error">{error.message}</p> : null}
        <div className="container">{!isLoading ? leagues : <Loading />}</div>
      </>
    );
  }
}
