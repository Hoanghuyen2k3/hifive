// src/components/PuzzleGame.js
import React, { useState, useEffect } from 'react';
import './Puzzle.css';
import { treeSearch } from './searchAlgorithm';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import { game4, selectGame4 } from '../../features/counterSlice';
import win from "../audio/win.mp3";

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
    const audio = new Audio(win);

    if (isSolved(puzzle)) {
      // alert(`Congratulations! You solved the puzzle in ${moves} moves.`);
      dispatch(game4());
      audio.play();

    
  } else {
    audio.pause();
    audio.currentTime = 0;
  }

  // Cleanup when the component is unmounted
  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
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
    setNumberToMove([]);
    setTraceback(treeSearch(puzzle, finalAnswer));
    
  }
  return (
    <div className="puzzle-container">
      <h1 className="puzzle-h1">8* Puzzle</h1>
      <h2 className="puzzle-span">Challenge your mind with the 8-Puzzle game, a captivating exercise in strategy and spatial reasoning. Maneuver numbered tiles within a 3x3 grid by sliding them into the empty square, aiming to arrange the numbers from 1 to 8. Victory is achieved by skillfully moving the empty space, strategically aligning the tiles in perfect order. Sharpen your puzzle-solving skills and enjoy the satisfaction of conquering the 8-Puzzle challenge.</h2>
      <div className="redirect">
            {
                status4 && <NavLink className="point-to-home" to="../home">Next Game</NavLink>
            }
          </div>
      
        
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

<button className="puzzle-solve" onClick={handleSove}>Help to Solve</button>
<div className="puzzle-hint">
  <ol>
    {numberToMove&&numberToMove.slice().reverse().map((n, index)=><li key={index}>Move {n}</li>) 
    }

  </ol>

</div>


    </div>
  );
};

export default Puzzle;


// puzzle_list = [
//   ("demo", [[1, 0, 3], [4, 2, 6], [7, 5, 8]]),
//   ("trivial", [[1, 2, 3], [4, 5, 6], [7, 8, 0]]),
//   ("very easy", [[1, 2, 3], [4, 5, 6], [7, 0, 8]]),
//   ("easy", [[1, 2, 0], [4, 5, 3], [7, 8, 6]]),
//   ("doable", [[0, 1, 2], [4, 5, 3], [7, 8, 6]]),
//   ("oh boy", [[8, 7, 1], [6, 0, 2], [5, 4, 3]]),
//   ("impossible", [[1, 2, 3], [4, 5, 6], [8, 7, 0]]),