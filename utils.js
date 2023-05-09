let solutions = [];

module.exports.printBoard = (board) => {
    let printString = []
    let rowDivider = "---------------------------"
    // column headers
    printString.push("  | ")
    for (i = 0; i < board.length; i++){
        if (i > 0 && i % 3 == 0){
            printString.push("| ")
        }
        printString.push(i+1)
        printString.push(" ")
    }
    
    printString.push("|")
    console.log(printString.join(""))
    console.log(rowDivider) //top border
    for (row = 0; row < board.length; row++){
        printString = [];
        if (row > 0 && row % 3 == 0){
            console.log(rowDivider) // dividing every 3 rows
        }
        printString.push(String.fromCharCode(row + 65) + " ");  // Inserting row headers. ASCII 65 is 'A'
        for (col = 0; col < board.length; col++){
            
            if (col % 3 == 0){
                printString.push("| ");
            }
            if (board[row][col] == 0){
                printString.push("_");
            } else{
                printString.push(board[row][col].toString());
            }
            printString.push(" ");
            if (col == board.length - 1){
                printString.push("| ");
            }
        }
        console.log(printString.join(""));  // joining the array elements together into a string
    }
    console.log(rowDivider)
}

isValid = (row, col, board, num) => {
    // check if number exists in the row
    if (board[row].includes(num)){
        // console.log(`${num} exists in this row already`)
        return false;
    }
    // check if number exists in the column
    if (board.some(r => r[col] == num)){
        // console.log(`${num} exists in this column already`)
        return false
    }

    // check if number exists in mini grid
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (r = 0; r < 3; r++){
        for (c = 0 ; c < 3; c++){
            let val = board[r + startRow][c + startCol]
            if (val == num){
                // console.log(`${num} exists in this 3x3 sub grid already`)
                return false;
            }
        }
    }
    return true;
}

const solve = (row = 0, col = 0, board) => {
    // console.log(`WORKING ON ROW ${row} COL ${col}`)
    if (row == 9){
        solutions.push(board);      // add the completed board to the solutions array if board is completed
        return true
    } else if (col == 9){
        return solve(row+1, 0, board);
    } else if (board[row][col] != 0){
        return solve(row, col+1, board);
    } else{
        for (let k = 1; k < 10; k++){
            // console.log(`Trying ${k}`);
            if (isValid(row, col, board, k)){
                board[row][col] = k;
                // console.log(`Entering stack COL=${col+1}`)
                if (solve(row, col+1, board)){
                    return true;
                }
                board[row][col] = 0;
            }
            // console.log(`${k}`)
        }
        // console.log(`Exiting stack COL=${col}`)
        return false;
    }
}

module.exports.solve = solve

module.exports.rotateMatrix = (array) => {
    const n = array.length
    // create a temp array
    let temp = Array.from(Array(n), () => Array.from(Array(n)));
    // iterate over the array
    // each array element arr[i][j] will move to its new index of arr[j][n - (i + 1)]
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n ; j++){
            temp[j][n - (i + 1)] = array[i][j];
        }
    }
    return temp;
}