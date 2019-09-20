import React, { Component } from 'react';

import League from './components/League';
import Loading from './components/Loading';
import { rearrangeMatches } from './utilities/utilities';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      leaguesObject: [],
      error: null,
      counter: 0
    };
  }

  componentDidMount() {
    this.TimerID = setInterval(() => this.refresh(), 15000);
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
        this.setState({ ...res });
        const { counter } = this.state;
        const leaguesRow = res.leagues.map((league) => (
          // console.log(league);
          <League
            key={league.competitionId}
            counter={counter}
            league={league}
            competitionId={league.competitionId}
            competitionName={league.competitionName}
            matches={league.matches}
            matchday={league.matchday}
          />
        ));
        this.setState({ leaguesObject: leaguesRow, isLoading: false, counter: counter + 1 });
      })
      .catch((err) => {
        this.setState({ error: err, isLoading: false });
      });
  }

  render() {
    const { leaguesObject, isLoading, error } = this.state;

    return (
      <>
        {error ? <p className="error">{error.message}</p> : null}
        <div>{!isLoading ? leaguesObject : <Loading />}</div>
      </>
    );
  }
}
