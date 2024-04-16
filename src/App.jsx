import { useState } from "react";
import Board from "./components/Board/Board";
import './App.css';
import ScoreBoard from "./components/Board/score/ScoreBoard";

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState("x");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    x: 0,
    o: 0
  });

  const reset = () => {
    setTurn('x');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  };

  const checkForWinner = (newSquares) => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], winningPositions[i]);
        return;
      }
    }

    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return;
    }
  };

  const handleClick = (index) => {
    if (turn && !winningSquares.length && squares[index] === null) {
      const newSquares = [...squares];
      newSquares.splice(index, 1, turn);
      setSquares(newSquares);
      checkForWinner(newSquares);
      setTurn(turn === 'x' ? 'o' : 'x');
    }
  }

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
  }

  return (
    <div className="container">
      <Board turn={turn} squares={squares} onClick={handleClick} winningSquares={winningSquares} />
      <ScoreBoard scoreO={score.o} scoreX={score.x} />
    </div>
  );
}

export default App;

