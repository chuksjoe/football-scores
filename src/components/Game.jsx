/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import '../assets/styles/Game.css';

import { getGameTime, formatScore, formatStatus } from '../utilities/utilities';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreColor: '#219653'
    };
  }

  componentDidUpdate(prevProps) {
    const { matchDetails: { score: { fullTime: { homeTeam, awayTeam } } } } = this.props;
    const { matchDetails: { score: { fullTime } } } = prevProps;
    if (fullTime.homeTeam !== homeTeam || fullTime.awayTeam !== awayTeam) {
      this.setState({
        scoreColor: '#E78000'
      });
      setTimeout(() => this.setState({
        scoreColor: '#219653'
      }), 20000);
    }
  }

  render() {
    const {
      matchDetails: {
        utcDate, homeTeam, awayTeam, score, status
      }
    } = this.props;
    const { scoreColor } = this.state;
    let style;
    if (status === 'IN_PLAY') style = { background: '#04E044' };
    else if (status === 'PAUSED') style = { background: '#E78000' };
    else if (status === 'FINISHED') style = { background: '#717371' };
    else style = { background: '#969121' };
    return (
      <div className="game">
        <div className="game-time" style={style}>
          {`${getGameTime(utcDate)} ${formatStatus(status)}`}
        </div>
        <div className="teams-score">
          <div className="home-team inline-b">{homeTeam.name}</div>
          <div className="score inline-b" style={{ background: scoreColor }}>
            {formatScore(score)}
          </div>
          <div className="away-team inline-b">{awayTeam.name}</div>
        </div>
      </div>
    );
  }
}
