import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Board from './components/tictactoe/Board';
import Tictactoe from './components/tictactoe/Tictactoe';
function App() {
  return (
    <div className="App">
        <Tictactoe />
    </div>
  );
}

export default App;
