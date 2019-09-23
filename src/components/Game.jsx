/* eslint-disable react/prop-types */
import React from 'react';

import '../assets/styles/Game.css';

import { getGameTime, formatScore, formatStatus } from '../utilities/utilities';

const Game = (props) => {
  const {
    matchDetails: {
      utcDate, homeTeam, awayTeam, score, status
    }
  } = props;
  const gameState = `${getGameTime(utcDate)}${formatStatus(status)}`;
  return (
    <div className="game">
      <div className="game-time">{gameState}</div>
      <div className="teams-score">
        <div className="home-team inline-b">{homeTeam.name}</div>
        <div className="score inline-b">{formatScore(score)}</div>
        <div className="away-team inline-b">{awayTeam.name}</div>
      </div>
    </div>
  );
};

export default Game;
