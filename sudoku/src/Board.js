const size = 9;
const indices = [];
for (let i = 0; i < size; i++){ indices.push(i); }

function Board({board, puzzle, handleCellChange}){
    //const [gameBoard, setGameBoard] = useState(board);
    const gameBoard = board;
    return (
      <div className="Board">
        <table>
          <tbody>
            {indices.map((rIndex) => {
              return <tr className={(rIndex + 1) % 3 === 0 ?'row-border' : ''} key={rIndex}>
                {indices.map((cIndex) => {
                  return <td className={(cIndex + 1) % 3 === 0 ?'col-border' : ''}key={rIndex + cIndex}>
                    <input onChange={(e) => handleCellChange(e, rIndex, cIndex)} value={gameBoard[rIndex][cIndex] === 0 ? '' : gameBoard[rIndex][cIndex]} type="text" className="cell-input" disabled={puzzle[rIndex][cIndex] !== 0} />
                    </td>
                  }
                  )}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
}

export default Board;