import React, { useState } from "react";

const TICTACTOE = ({ length = 9 }) => {
  const [cells, setCells] = useState(Array(length).fill(""));
  const [show, setShow] = useState(false);
  const [isXTurn, setIsXturn] = useState(true);
  const [winner, setWinner] = useState(null);

  //Handle Toggling Buttons
  const handleToggleButton = () => {
    setCells(Array(length).fill(""));
    setShow(!show);
    setIsXturn(true);
    setWinner(null);
  };

  // Handling Wining Logic
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < winningPattern.length; i++) {
      const [a, b, c] = winningPattern[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  // Handling Cell clicks
  const handleCellClicks = (index) => {
    // If the play button is not clicked or if cell is not empty or winner is already decided simply return it
    if (!show || cells[index] !== "" || winner) return;

    const newCells = [...cells];
    newCells[index] = isXTurn ? "X" : "O";
    setCells(newCells);
    setIsXturn(!isXTurn);

    const result = calculateWinner(newCells);
    if (result) {
      setWinner(result);
    } else if (newCells.every((cell) => cell !== "")) {
      setWinner("Draw");
    }
  };

  console.log(cells);
  return (
    <>
      <div className="container">
        <h1>TIC TAC TOE</h1>
        {/* Player Turn Section and Play Button */}

        <div className="player_container">
          <div className="player_turn">
            {winner
              ? winner === "Draw"
                ? "It's a Draw"
                : `Player ${winner} wins!`
              : show
              ? `Player ${isXTurn ? "X" : "O"}'s turn`
              : "Click Play Button"}
          </div>
          <button className="play_reset_button" onClick={handleToggleButton}>
            {show ? "Reset" : "Play"}
          </button>
        </div>

        {/* Cells Section */}
        <div className="cell_container">
          {cells?.map((item, index) => {
            return (
              <div
                className="cell_items"
                key={index}
                onClick={() => handleCellClicks(index)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TICTACTOE;
