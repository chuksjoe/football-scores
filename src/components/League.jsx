/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import Game from './Game';
import '../assets/styles/League.css';

export default class League extends Component {
  constructor(props) {
    super(props);
    const { league } = this.props;
    this.initialState = [];
    this.state = {
      league
    };
  }

  static getDerivedStateFromProps(state, props) {
    return {
      ...state,
      league: {
        ...state.league,
        matches: props.league.matches
      }
    };
  }

  render() {
    const {
      league: {
        matches, competitionId, competitionName, matchday, rand
      }
    } = this.state;
    const games = matches.map((match) => (
      <Game key={match.id} matchDetails={match} />
    ));
    const matchDay = `Match day: ${matchday}`;
    return (
      <div className="league" id={competitionId} data-rand={rand}>
        <div className="league-header">
          <span className="league-name">{competitionName}</span>
          <span className="match-day">{matchDay}</span>
        </div>
        {games}
      </div>
    );
  }
}
