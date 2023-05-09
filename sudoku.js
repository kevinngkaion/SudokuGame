/*
1. Make game board
    a. 9 by 9 2d array
    b. create print board func
2. Make board solver to test board
    a. Use an existing easy sudoku solution
    b. Write test cases
3. Use working test cases to start developing sudoku generator

Seeds for sudoku puzzles taken from http://lipas.uwasa.fi/~timan/sudoku/
*/

const { printBoard, solve, generateSudoku } = require('./utils');
const { readFileSync } = require('fs');

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

let rand = Math.ceil(Math.random() * 6)
const fileName = `puzzles/${process.argv[2]}${rand}.txt`

const file = readFileSync(fileName, 'utf-8');
const puzzle = generateSudoku(file);

printBoard(puzzle);

// if (solve(0,0, puzzle)){
//     printBoard(puzzle);
// } else{
//     console.log("Could not find a solution");
// }