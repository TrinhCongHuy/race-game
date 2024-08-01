import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [pointsA, setPointsA] = useState(1);
  const [pointsB, setPointsB] = useState(1);
  const [status, setStatus] = useState("Same point");
  const [gameOver, setGameOver] = useState(false);

  const progressBarRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (progressBarRef.current) {
      setMaxWidth(progressBarRef.current.offsetWidth);
    }
  }, []);

  const handleRace = () => {
    if (gameOver) return;

    const randomChoice = Math.random() < 0.5;
    if (randomChoice) {
      const newPointsA = pointsA + 1;
      setPointsA(newPointsA);
      if (newPointsA * 20 >= maxWidth) {
        setStatus("A wins!");
        setGameOver(true);
      } else {
        updateStatus(newPointsA, pointsB);
      }
    } else {
      const newPointsB = pointsB + 1;
      setPointsB(newPointsB);
      if (newPointsB * 20 >= maxWidth) {
        setStatus("B wins!");
        setGameOver(true);
      } else {
        updateStatus(pointsA, newPointsB);
      }
    }
  };

  const updateStatus = (newPointsA, newPointsB) => {
    if (newPointsA > newPointsB) {
      setStatus("A is winning");
    } else if (newPointsA < newPointsB) {
      setStatus("B is winning");
    } else {
      setStatus("Same point");
    }
  };

  const handleReset = () => {
    setPointsA(1);
    setPointsB(1);
    setStatus("Same point");
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>{status}</h1>
      <div>
        <p>Character A</p>
        <div className="progress-bar" ref={progressBarRef}>
          <div className="progress" style={{ width: `${pointsA * 20}px` }}></div>
        </div>
      </div>
      <div>
        <p>Character B</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${pointsB * 20}px` }}></div>
        </div>
      </div>
      <button onClick={handleRace} disabled={gameOver}>Race</button>
      {Math.max(pointsA, pointsB) > 1 && (
        <button onClick={handleReset}>Reset</button>
      )}
    </div>
  );
}

export default App;
