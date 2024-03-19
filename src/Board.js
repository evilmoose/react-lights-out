import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

// **Board**

// The most sophisticated component. It will hold the state that represents the in-memory grid of 
// true/false for lights-on/off. Since the state for the board lives here, this is also were the 
// *setState()* calls will need to go — and therefore, the functions that call *setState()*.

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.3}) => {
  // To summarize, this function generates a board of size nrows by ncols, where each cell has a 
  // chanceLightStartsOn probability of starting in the true state.
  const createBoard = () => {
    return Array.from({length: nrows}).map(
      row => Array.from({length: ncols}).map(
          cell => Math.random() < chanceLightStartsOn
      )
  );
  }

  const [board, setBoard] = useState(createBoard);

  const hasWon = () => {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // TODO

  // make table board
  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tableBoard}</tbody>
      </table>
  );

  // TODO
}

export default Board;
