/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import Game from './Game';

export default class League extends Component {
  constructor(props) {
    super(props);
    this.initialState = [];
    this.state = {
      competitionId: props.competitionId,
      competitionName: props.competitionName,
      matches: props.matches,
      matchday: props.matchday
    };
  }

  render() {
    const {
      matches, competitionId, competitionName, matchday
    // eslint-disable-next-line react/destructuring-assignment
    } = this.props.league;
    const { counter } = this.props;
    const games = matches.map((match) => <Game key={match.id} matchDetails={match} counter={counter} />);
    const matchDay = `Match day: ${matchday}`;
    return (
      <div className="league" id={competitionId}>
        <h3>{competitionName}</h3>
        <p>{matchDay}</p>
        {games}
      </div>
    );
  }
}
