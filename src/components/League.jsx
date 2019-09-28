/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

import Game from './Game';
import '../assets/styles/League.css';

export default class League extends PureComponent {
  render() {
    const {
      league: {
        matches, competitionId, competitionName, matchday, rand
      }
    } = this.props;
    const games = matches
      .sort((a, b) => {
        const dateDiff = new Date(a.utcDate) - new Date(b.utcDate);
        if (dateDiff === 0) {
          return a.id - b.id;
        } else {
          return dateDiff;
        }
      })
      .map((match) => (
        <Game key={match.id} matchDetails={match} />
      ));
    const matchDay = `Matchday: ${matchday}`;
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
