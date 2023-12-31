import React, {useEffect, useState} from 'react'
import Board from './Board'
import { game2, selectGame2 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import "./Tic.scss"
import win from "../audio/win.mp3";

let player = 'O', opponent = 'X'; 

// Generate all possible winning lines for a square board of any size
const winningLines = (boardSize) => {
    const lines = [];
  
    // Check rows
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= boardSize - 3; j++) {
        lines.push([i * boardSize + j, i * boardSize + j + 1, i * boardSize + j + 2]);
      }
    }
  
    // Check columns
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= boardSize - 3; j++) {
        lines.push([j * boardSize + i, (j + 1) * boardSize + i, (j + 2) * boardSize + i]);
      }
    }
  
    // Check diagonals
    for (let i = 0; i <= boardSize - 3; i++) {
      for (let j = 0; j <= boardSize - 3; j++) {
        lines.push([i * boardSize + j, (i + 1) * boardSize + j + 1, (i + 2) * boardSize + j + 2]);
        lines.push([i * boardSize + j + 2, (i + 1) * boardSize + j + 1, (i + 2) * boardSize + j]);
      }
    }
  
    return lines;
  };

const checkWinner = (squares, lines) => {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    
    return null;
    };


const calculateWinner = (squares, lines) => {
    const winner = checkWinner(squares, lines);
    return winner ? `${winner}` : squares.includes(null) ? null : 'Draw';
  };

function minimax(squares, depth, alpha, beta, isMax, matrix) {
  const lines = winningLines(matrix);
  const winner = calculateWinner(squares, lines);
  if (winner === player){
    return 10;
  }
  if (winner === opponent){
      return -10;
  }
  if (winner === "Draw"){
      return 0;
  }
  if (depth === 0) {
    return 0;

  }


  if (isMax) {
      let best = -100;
      for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
              squares[i] = player;
              best = Math.max(best, minimax(squares, depth - 1, alpha, beta, false, matrix));
              squares[i] = null;
              alpha = Math.max(alpha, best);
              if (beta <= alpha) break; 
          }
      }
      return best;
  } else {
      let best = 100;
      for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
              squares[i] = opponent;
              best = Math.min(best, minimax(squares, depth - 1, alpha, beta, true, matrix));
              squares[i] = null;
              beta = Math.min(beta, best);
              if (beta <= alpha) break; 
          }
      }
      return best;
  }
}

function findBestMove(squares, matrix) {
  let bestVal = -100;
  let bestMove = -1;
  let alpha = -100;
  let beta = 100;

  for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
          squares[i] = player;

          let moveVal = minimax(squares, matrix*matrix, alpha, beta, false, matrix);
          squares[i] = null;
          if (moveVal > bestVal) {
              bestVal = moveVal;
              bestMove = i;
          }
      }
  }

  return bestMove;
}

const findMove= (squares)=>{
  
  let move = Math.floor(Math.random() * (squares.length));
  if (squares[move] === null) {
    return move;
  }
  else{
    findMove(squares);
  }
}

function Tictactoe() {
    const [matrix, setMatrix] = useState(3)
    const [initialBoard, setInitialBoard] = useState(Array(matrix*matrix).fill(null));
    const [history, setHistory] = useState([initialBoard]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const dispatch = useDispatch();
    const status2 = useSelector(selectGame2);
  // Update the game state when matrix changes
    useEffect(() => {
        setInitialBoard(Array(matrix * matrix).fill(null));
        setHistory([Array(matrix * matrix).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    }, [matrix]);

    const currentSquares = history[stepNumber];
    let lines = winningLines(matrix);
    console.log(lines);

    const winner = calculateWinner(currentSquares, lines);
    useEffect(() => {
      const audio = new Audio(win);

      if (winner) {
        dispatch(game2());
        audio.play();
      }else {
        audio.pause();
        audio.currentTime = 0;
      }
  
      // Cleanup when the component is unmounted
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }, [winner, dispatch]);    
  
    useEffect(() => {
      if (!xIsNext) {
        const timeout = setTimeout(() => {
          makeAIMove();
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }, [xIsNext, currentSquares]);

  
    const makeAIMove = () => {
      if (winner || currentSquares.every((square) => square !== null)) {
        return;
      }
  
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = currentSquares.slice();
      console.log("square: ", squares);
      console.log("currentSquares: ", currentSquares)
  
    //   const bestMove = getBestMove(squares, xIsNext ? 'O' : 'X');
      // let bestMove = findBestMove(squares);
      let bestMove = matrix === 3? findBestMove(squares, matrix) : findMove(squares);
      
      console.log("Best move for 'O':", bestMove);
      
      console.log("bestMove: ", bestMove);
      console.log("xIsNext: ", xIsNext)
      squares[bestMove] = xIsNext ? 'X' : 'O';
  
      setHistory([...newHistory, squares]);
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    };
  
    const handleClick = (index) => {
      if (currentSquares[index] || winner) {
        return;
      }
  
      const newHistory = history.slice(0, stepNumber + 1);
      const squares = currentSquares.slice();
      squares[index] = xIsNext ? 'X' : 'O';
  
      setHistory([...newHistory, squares]);
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    };

    
  
  
   
    
    const restartGame = () => {
        setInitialBoard(Array(matrix * matrix).fill(null));
        setHistory([Array(matrix * matrix).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    }
     

   
   

    return (
        <div className="tic-game">
          <h1 className="tic-h1">Tic Tac Toe</h1>
          <h2 className="tic-span">Take on the challenge of Tic Tac Toe against a cunning computer opponent! You, as the 'X' player, make the first move. Your mission is to strategically place three 'X' marks consecutively in a row, column, or diagonal to secure victory. The computer, playing as 'O,' will employ the powerful Minimax algorithm on a 3x3 board, ensuring a formidable match.</h2>
          <div className="redirect">
            {
                status2 && <NavLink className="point-to-home" to="../home">Next Game </NavLink>
            }
          </div>
          <button className="tic-restart" onClick={restartGame}>Restart</button>
          <h2 className="tic-infor">{ !winner ? `Next player: ${xIsNext ? 'X' : 'O'}` : (winner==='X' ? "You Win 😃!":(winner==='O'? "You Lose 😥" : "Draw 🙂"))}</h2>

            <Board initialBoard = {initialBoard} matrix ={matrix} squares={currentSquares} onClick={handleClick} />
            

        </div>
  )
}

export default Tictactoe