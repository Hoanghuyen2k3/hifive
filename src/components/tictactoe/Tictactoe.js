import React, {useEffect, useState} from 'react'
import Board from './Board'

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
        lines.push([i * boardSize + j + 3, (i + 1) * boardSize + j + 2, (i + 2) * boardSize + j + 1]);
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



function Tictactoe() {
    const [matrix, setMatrix] = useState(3)
    const [initialBoard, setInitialBoard] = useState(Array(matrix*matrix).fill(null));
    const [history, setHistory] = useState([initialBoard]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
  // Update the game state when matrix changes
    useEffect(() => {
        setInitialBoard(Array(matrix * matrix).fill(null));
        setHistory([Array(matrix * matrix).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    }, [matrix]);

    const currentSquares = history[stepNumber];
    let lines = winningLines(matrix)

    const winner = calculateWinner(currentSquares, lines);
  
    useEffect(() => {
      if (!xIsNext) {
        const timeout = setTimeout(() => {
          makeAIMove();
        }, 500);
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
      let bestMove = findBestMove(squares);
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

    function minimax(squares, depth, alpha, beta, maximizingPlayer) {
      if (winner === player){
        return 10;
      }
      if (winner === opponent){
          return -10;
      }
      if (winner === "Draw"){
          return 0;
      }
  
      if (maximizingPlayer) {
          let best = -Infinity;
          for (let i = 0; i < squares.length; i++) {
              if (squares[i] === null) {
                  squares[i] = player;
                  best = Math.max(best, minimax(squares, depth + 1, alpha, beta, !maximizingPlayer));
                  squares[i] = null;
                  alpha = Math.max(alpha, best);
                  if (beta <= alpha) break; // Beta pruning
              }
          }
          return best;
      } else {
          let best = Infinity;
          for (let i = 0; i < squares.length; i++) {
              if (squares[i] === null) {
                  squares[i] = opponent;
                  best = Math.min(best, minimax(squares, depth + 1, alpha, beta, !maximizingPlayer));
                  squares[i] = null;
                  beta = Math.min(beta, best);
                  if (beta <= alpha) break; // Alpha pruning
              }
          }
          return best;
      }
  }
  
  function findBestMove(squares) {
      let bestVal = -Infinity;
      let bestMove = -1;
      let alpha = -Infinity;
      let beta = Infinity;
  
      for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
              squares[i] = player;
  
              let moveVal = minimax(squares, 0, alpha, beta, false);
              squares[i] = null;
              if (moveVal > bestVal) {
                  bestVal = moveVal;
                  bestMove = i;
              }
          }
      }
  
      return bestMove;
  }
   
  
    const getBestMove = (squares, player) => {
      
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          return i;
        }
      }
    };
    
    const restartGame = () => {
        setInitialBoard(Array(matrix * matrix).fill(null));
        setHistory([Array(matrix * matrix).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    }
     

   
   

    return (
        <div>
            <h2>Choose game size: </h2>
            <p>{matrix} x {matrix}</p>
            <input type="number" value={matrix} onChange={(event)=>setMatrix(parseInt(event.target.value, 10) || 0)}/>
            
            <Board initialBoard = {initialBoard} matrix ={matrix} squares={currentSquares} onClick={handleClick} />
            <div className="game-info">
                <div>{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</div>
                <button onClick={restartGame}>Restart</button>
            </div>

        </div>
  )
}

export default Tictactoe