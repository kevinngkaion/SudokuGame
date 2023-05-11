/*
Seeds for sudoku puzzles taken from http://lipas.uwasa.fi/~timan/sudoku/
*/
const express = require('express');
const cors = require('cors');       // cors is required to enable communication between express and react due to Same Origin Policy
const { printBoard, solve, generateSudoku } = require('./utils');
const { readFileSync } = require('fs');
const app = express();
app.use(cors());
const port = 3000;

let rand = Math.ceil(Math.random() * 6)
const fileName = 'easy'
const filePath = `puzzles/${fileName}${rand}.txt`

const file = readFileSync(filePath, 'utf-8');
const puzzle = generateSudoku(file);
const solution = JSON.parse(JSON.stringify(puzzle))
solve(0,0, solution);
app.get('/', (req, res) => {
    res.json({puzzle: puzzle, solution: solution})
})

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`)
})