// TicTacToe.tsx
import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import './TicTacToe.css';

const TicTacToe: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;

  const handleClick = (i: number) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(currentHistory.concat([{ squares }]));
    setStepNumber(currentHistory.length);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const status = winner
    ? `Winner: ${winner}`
    : stepNumber === 9
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>
          {history.map((step, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move === 0 ? 'Go to game start' : `Go to move #${move}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
