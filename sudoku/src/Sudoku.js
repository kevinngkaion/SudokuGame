import './App.css';
import { useEffect, useState } from 'react';
import Board from './Board'
import ButtonsBottom from './ButtonsBottom';
import ButtonsTop from './ButtonsTop';

function Sudoku() {
  // set the useStates for the props
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [puzzleState, setPuzzleState] = useState(null);

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

  async function fetchBoard(difficulty) {
    let url;
    if (difficulty){
      url = `http://localhost:8000/sudoku/${difficulty}`;
    } else {
      url = 'http://localhost:8000/sudoku';
    }
    
    const res = await fetch(url)
    const {puzzle, solution} = await res.json();
    setPuzzle(puzzle);
    setBoard(puzzle);
    setPuzzleState(puzzle);
    setSolution(solution);
  }
    
    // useEffect runs on the first rendering of the page. Here I am fetching the json object from my express api
    useEffect(() => {
      fetchBoard();
    },[])

  const solvePuzzle = () => {
    setBoard(solution);
  }

  const checkPuzzle = () => {
    const temp = getDeepCopy(puzzle);
    if (board) {
      board.forEach((row, rIndex) => {
      row.forEach((val, cIndex) => {
        if (val === solution[rIndex][cIndex]){
          temp[rIndex][cIndex] = val;
        }
      })
    })
    setPuzzleState(temp);
    }
  }

  const resetPuzzle = () => {
    setBoard(puzzle);
    setPuzzleState(puzzle);
  }

  const getNewPuzzle = (difficulty) => {
      fetchBoard(difficulty);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku Solver</h3>
        <ButtonsTop getNewPuzzle={getNewPuzzle}/>
        {puzzle && <Board board={board} puzzleState={puzzleState} handleCellChange={handleCellChange}/>}
        <ButtonsBottom board={board} checkPuzzle={checkPuzzle} solvePuzzle={solvePuzzle} resetPuzzle={resetPuzzle}/>
      </div>
    </div>
  );
}

export default Sudoku;
