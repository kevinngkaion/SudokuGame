const { cp } = require("fs");


const printBoard = (board) => {
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

const isValid = (row, col, board, num) => {
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

const rotateMatrix = (array, times) => {
    if (times === 0){
        return array;
    }
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
    return rotateMatrix(temp, times - 1);
}

const shuffle = (low, high) => {
    let arr = []
    for (let i = low; i <= high; i++){
        arr.push(i);
    }
    let currentIndex = arr.length;
    let tempValue, randomIndex;
    
    // While there are elements to shuffle
    while (currentIndex !== 0){
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // Swap the number at the random index with the currentIndex
        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = tempValue;
    }
    return arr;
}

const mapMatrix = (array, times) => {
    if (times === 0){
        return
    }
    let map = shuffle(1,9);
    for(let row = 0; row < array.length; row++){
        for (let col = 0; col < array.length; col++){
            let val = array[row][col];
            if (val !== 0){
                array[row][col] = map[val-1];
            }
        }
    }
    mapMatrix(array, times - 1);
}

const shuffleRows = (array, times) => {
    if (times === 0){
        return
    }
    let top = shuffle(0,2);
    let middle = shuffle(3,5);
    let bottom = shuffle(6,8);
    let map = top.concat(middle).concat(bottom)
    for (let i = 0; i < array.length; i++){
        let swapIndex = map[i];
        let temp = array[swapIndex];
        array[swapIndex] = array[i];
        array[i] = temp;
    }
    shuffleRows(array, times -1);
}

const shuffleCols = (array, times) => {
    if (times === 0){
        return;
    }
    array = rotateMatrix(array, 1);
    shuffleRows(array, 1);
    array = rotateMatrix(array, 3);
    shuffleCols(array, times - 1);
}

const generateRandom = (low, high) => {
    return Math.floor(Math.random() * high) + low;
}

const generateSudoku = (file) => {
    let seed = [];
    // split the text by new line and filter away any elements that are a return carriage or empty string
    let rows = file.split('\n').filter((element) => element !== '\r' && element !== '')
    for (let i = 0; i < rows.length; i++){
        // split the spaces so only the chars of the numbers remain
        rows[i] = rows[i].split(' ');
        // cast the string of the number to an int
        seed[i] = rows[i].map((value) => parseInt(value));
    }
    let puzzle = rotateMatrix(seed, generateRandom(0, 107));
    mapMatrix(puzzle, generateRandom(0, 107));
    shuffleRows(puzzle, generateRandom(0, 107));
    shuffleCols(puzzle, generateRandom(0, 107));
    return puzzle;
}

module.exports = {
    printBoard,
    solve,
    generateSudoku
}