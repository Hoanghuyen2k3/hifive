// src/components/PuzzleGame.js
import React, { useState, useEffect } from 'react';
import './Puzzle.css';
import { treeSearch } from './searchAlgorithm';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import { game4, selectGame4 } from '../../features/counterSlice';

const finalAn = (N)=>{
    let answer = [];
    let j =[];
    for (let i = 0; i <N; i++){
        j.push(i+1);
        if(i === N-2){
            j.push(null);
        }
        if((i+1) % 3 ===0){
            answer.push(j);
            j = [];
        }
    }
    return answer;
}
const finalAnswer = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];


console.log(finalAnswer);
const Puzzle = () => {
  const [puzzle, setPuzzle] = useState([[0, 1, 2], [4, 5, 3], [7, 8, 6]]);
  const [moves, setMoves] = useState(0);
  const [traceback, setTraceback] = useState(null);
  const [numberToMove, setNumberToMove] = useState([]);
  const dispatch = useDispatch();
  const status4 = useSelector(selectGame4);

  // const winner = isSolved(puzzle);

  useEffect(() => {
    if (isSolved(puzzle)) {
      // alert(`Congratulations! You solved the puzzle in ${moves} moves.`);
      dispatch(game4());

    }
  }, [puzzle]);

  useEffect(()=>{
    let num = [];
    if (traceback){
      for (let i = 0; i < traceback.length; i++) {
        let array = traceback[i];
      const zeroIndex = findIndexOfZero(array);
  
      if (zeroIndex.rowIndex !== -1 && zeroIndex.columnIndex !== -1 && i !==0) {
            num = [...num, traceback[i-1][zeroIndex.rowIndex][zeroIndex.columnIndex]]
        }
       else {
        console.log("'0' not found in the nested array");
      }}  
    }
    console.log(num);
    setNumberToMove(num);

}, [traceback]);

function findIndexOfZero(array) {
  for (let i = 0; i < array.length; i++) {
    const innerArray = array[i];
    const innerIndex = innerArray.indexOf(0);

    if (innerIndex !== -1) {
      return { rowIndex: i, columnIndex: innerIndex };
    }
  }

  return { rowIndex: -1, columnIndex: -1 };
}

  

  const isSolved = (currentPuzzle) => {
    const flatPuzzle = currentPuzzle.flat();
    return flatPuzzle.slice(0, flatPuzzle.length - 1).every((number, index) => number === index + 1);
  };

  const handleTileClick = (row, col) => {
    const emptyTile = findEmptyTile(puzzle);
    if (isValidMove(emptyTile, row, col)) {
      const newPuzzle = moveTile(puzzle, emptyTile, row, col);
      setPuzzle(newPuzzle);
      setMoves(moves + 1);
    }
  };

  const findEmptyTile = (currentPuzzle) => {
    for (let i = 0; i < currentPuzzle.length; i++) {
      for (let j = 0; j < currentPuzzle[i].length; j++) {
        if (currentPuzzle[i][j] === 0) {
          return { row: i, col: j };
        }
      }
    }
  };

  const isValidMove = (emptyTile, row, col) => {
    const { row: emptyRow, col: emptyCol } = emptyTile;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const moveTile = (currentPuzzle, emptyTile, row, col) => {
    const newPuzzle = [...currentPuzzle];
    [newPuzzle[emptyTile.row][emptyTile.col], newPuzzle[row][col]] = [
      newPuzzle[row][col],
      newPuzzle[emptyTile.row][emptyTile.col],
    ];
    return newPuzzle;
  };
  console.log(puzzle);

  const handleSove =()=>{
    setTraceback(treeSearch(puzzle, finalAnswer));
    setNumberToMove([]);
  }
  return (
    <div className="puzzle-container">
      <div>
        {status4&&<NavLink to="../home">Home</NavLink>}
      </div>
      {numberToMove&&numberToMove.map((n)=><p>{n}</p>)}
        
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tile, colIndex) => (
            <button
              key={colIndex}
              className={`tile ${tile === null ? 'empty' : ''}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {tile !== 0 ? tile : ''}
            </button>
            
          ))}
          <br/>
        </div>
      ))}
      <button onClick={handleSove}>Solve</button>
    </div>
  );
};

export default Puzzle;
