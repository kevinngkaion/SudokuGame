function ButtonsBottom({solvePuzzle, resetPuzzle, checkPuzzle}){
    return (
        <div className="ButtonsBottom">
            <div className="button-container">
                <button className="button check" onClick={checkPuzzle}>Check</button>
                <button className="button solve" onClick={solvePuzzle}>Solve</button>
                <button className="button reset" onClick={resetPuzzle}>Reset</button>
            </div>
        </div>
    )
}

export default ButtonsBottom;