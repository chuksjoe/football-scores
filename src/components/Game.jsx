/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../assets/styles/Game.css';

import { getGameTime, formatScore, formatStatus } from '../utilities/utilities';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetails: props.matchDetails
    };
  }

  static getDerivedStateFromProps(props) {
    return ({
      matchDetails: props.matchDetails
    });
  }

  render() {
    const {
      matchDetails: {
        utcDate, homeTeam, awayTeam, score, status
      }
    } = this.state;
    console.log(homeTeam, formatScore(score), formatStatus(status), this.state.matchDetails);
    return (
      <div className="game">
        <div className="game-time">
          {`${getGameTime(utcDate)} ${formatStatus(status)}`}
        </div>
        <div className="teams-score">
          <div className="home-team inline-b">{homeTeam.name}</div>
          <div className="score inline-b">{formatScore(score)}</div>
          <div className="away-team inline-b">{awayTeam.name}</div>
        </div>
      </div>
    );
  }
}
