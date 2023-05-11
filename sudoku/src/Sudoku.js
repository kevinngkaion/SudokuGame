import './App.css';
import { useEffect, useState } from 'react';
import Board from './Board'

function Sudoku() {
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(null);
  const [puzzle, setPuzzle] = useState(null);


  const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }

  const handleCellChange = (e, row, col) => {
    let val = parseInt(e.target.value) || 0;
    let grid = getDeepCopy(board);
    if (val === -1 || (val >= 1 && val <= 9)) {
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
        <button className="button solve" onClick={solvePuzzle}>Solve</button>
      </div>
    </div>
  );
}

export default Sudoku;
