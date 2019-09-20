/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-curly-newline */
import React from 'react';

import '../assets/styles/Game.css';

import { getGameTime, formatScore } from '../utilities/utilities';

const Game = (props) => {
  const { utcDate, homeTeam, awayTeam, score, status } = props.matchDetails;
  const gameState = `${getGameTime(utcDate)} ${status}`;
  console.log(props.counter);
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
