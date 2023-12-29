import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Board from './components/tictactoe/Board';
import Tictactoe from './components/tictactoe/Tictactoe';
import RockPapperScissors from './components/rock_scisscors_papper/RockPapperScissors';
import MemoryCard from './components/memory_card_game/MemoryCard';
import WordSearchGame from './components/word_search_game/WordSearchGame';
function App() {
  return (
    <div className="App">
        {/* <Tictactoe /> */}
        {/* <RockPapperScissors /> */}
        {/* <MemoryCard />  */}
        <WordSearchGame />
    </div>
  );
}

export default App;
