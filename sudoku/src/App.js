import './App.css';
import { useEffect, useState } from 'react';

// const initial = [
//   [-1, 5, -1, 9, -1, -1, -1, -1, -1],
//   [8, -1, -1, -1, 4, -1, 3, -1, 7],
//   [-1, -1, -1, 2, 8, -1, 1, 9, -1],
//   [5, 3, 8, 6, -1, 7, 9, 4, -1],
//   [-1, 2, -1, 3, -1, 1, -1, -1, -1],
//   [1, -1, 9, 8, -1, 4, 6, 2, 3],
//   [9, -1, 7, 4, -1, -1, -1, -1, -1],
//   [-1, 4, 5, -1, -1, -1, 2, -1, 9],
//   [-1, -1, -1, -1, 3, -1, -1, 7, -1]
// ];

// function fixPuzzle(initial) {
//   return initial.map(row => {
//     return row.map(val => val === -1 ? 0 : val)
//   })
// }

// const puzzle = fixPuzzle(initial);

function App() {
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(null);
  const [puzzle, setPuzzle] = useState(null);


  const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }

  const onInputChange = (e, row, col) => {
    let val = parseInt(e.target.value) || -1;
    let grid = getDeepCopy(board);
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }
    setBoard(grid);
  }

  useEffect(() => {
    fetch("http://localhost:3000/")
    .then(res => {return res.json();})
    .then(data => {
      setPuzzle(data.puzzle);
      setBoard(data.puzzle);
      setSolution(data.solution);
    })
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku Solver</h3>
        {puzzle && <table>
          <tbody>
            {puzzle.map((rVal, rIndex) => {
              return <tr key={rIndex}>
                {puzzle.map((cVal, cIndex) => {
                  return <td key={rIndex + cIndex}>
                    <input onChange={(e) => onInputChange(e, rIndex, cIndex)} value={board[rIndex][cIndex] === 0 ? '' : board[rIndex][cIndex]} type="text" className="cell-input" disabled={puzzle[rIndex][cIndex] !== 0} />
                    </td>
                  }
                )}
              </tr>
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}

export default App;
