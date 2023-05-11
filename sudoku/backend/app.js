/*
Seeds for sudoku puzzles taken from http://lipas.uwasa.fi/~timan/sudoku/
*/
const express = require('express');
const cors = require('cors');       // cors is required to enable communication between express and react due to Same Origin Policy
const { printBoard, solve, generateSudoku } = require('./utils');
const { readFileSync } = require('fs');
const app = express();
app.use(cors());
const port = 8000;

app.get('/sudoku/:difficulty?', (req, res) => {
    const difficulty = req.params.difficulty;
    let fileName = 'easy'
    if (difficulty) {
        fileName = difficulty;
    }
    let rand = Math.ceil(Math.random() * 6)
    const filePath = `puzzles/${fileName}${rand}.txt`
    
    const file = readFileSync(filePath, 'utf-8');
    const puzzle = generateSudoku(file);
    const solution = JSON.parse(JSON.stringify(puzzle))
    solve(0,0, solution);
    res.status(200).json({puzzle: puzzle, solution: solution})
})

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`)
})