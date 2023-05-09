/*
1. Make game board
    a. 9 by 9 2d array
    b. create print board func
2. Make board solver to test board
    a. Use an existing easy sudoku solution
    b. Write test cases
3. Use working test cases to start developing sudoku generator
*/

const { printBoard, solve, rotateMatrix } = require('./utils');

// const solution = [
//     [4, 3, 5, 2, 6, 9, 7, 8, 1],
//     [6, 8, 2, 5, 7, 1, 4, 9, 3],
//     [1, 9, 7, 8, 3, 4, 5, 6, 2],
//     [8, 2, 6, 1, 9, 6, 3, 4, 7],
//     [3, 7, 4, 6, 8, 2, 9, 1, 5],
//     [9, 5, 1, 7, 4, 3, 6, 2, 8],
//     [5, 1, 9, 3, 2, 6, 8, 7, 4],
//     [2, 4, 8, 9, 5, 7, 1, 3, 6],
//     [7, 6, 3, 4, 1, 8, 2, 5, 9]
// ]

const seed = [];

const fs = require('fs');

fs.readFile(`puzzles/${process.argv[2]}`, 'utf-8', (err, data) => {
    if (err) { 
        console.error(err);
        return;
    }
    // split the text by new line and filter away any elements that are a return carriage or empty string
    let rows = data.split('\n').filter((element) => element !== '\r' && element !== '')
    for (let i = 0; i < rows.length; i++){
        // split the spaces so only the chars of the numbers remain
        rows[i] = rows[i].split(' ');
        // cast the string of the number to an int
        seed[i] = rows[i].map((value) => parseInt(value));
    }
    if (solve(0,0, seed)){
        printBoard(seed);
    } else{
        console.log("Could not find a solution");
    }
    let puzzle = rotateMatrix(seed);
    if (solve(0,0, puzzle)){
        printBoard(puzzle);
    } else{
        console.log("Could not find a solution");
    }
});