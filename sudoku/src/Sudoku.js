import './App.css';
import { useEffect, useState } from 'react';
import Board from './Board'
import ButtonsBottom from './ButtonsBottom';

function Sudoku() {
  // set the useStates for the props
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(null);
  const [puzzle, setPuzzle] = useState(null);

  // returns a deep copy of an array
  const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }

  // This function is called on cell change. It checks the value of the cell and changes the gameBoard accordingly 
  const handleCellChange = (e, row, col) => {
    // e is the event that triggered. Target is what caused the event
    let val = parseInt(e.target.value) || 0;
    let grid = getDeepCopy(board);
    if (val === 0 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setBoard(grid);
    return grid;
  }

  useEffect(() => {
    console.log("Fetching")
    fetch("http://localhost:3000/")
    .then(res => {return res.json();})
    .then(data => {
      setPuzzle(data.puzzle);
      setBoard(data.puzzle);
      setSolution(data.solution);
    })
  }, [])

  const solvePuzzle = () => {
    setBoard(solution);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku Solver</h3>
        {puzzle && <Board board={board} puzzle={puzzle} handleCellChange={handleCellChange}/>}
        <ButtonsBottom solvePuzzle={solvePuzzle}/>
      </div>
    </div>
  );
}

export default Sudoku;
