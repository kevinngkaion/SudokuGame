function ButtonsTop({getNewPuzzle}){
    return (
        <div className="ButtonsTop">
            <div className="button-container">
                <button className="button easy" onClick={() => getNewPuzzle('easy')}>New: Easy</button>
                <button className="button medium" onClick={() => getNewPuzzle('medium')}>New: Medium</button>
                <button className="button hard" onClick={() => getNewPuzzle('hard')}>New: Hard</button>
            </div>
        </div>
    )
}

export default ButtonsTop;