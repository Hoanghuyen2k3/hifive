import React from 'react';
import './App.css';
import Tictactoe from './components/tictactoe/Tictactoe';
import RockPapperScissors from './components/rock_scisscors_papper/RockPapperScissors';
import MemoryCard from './components/memory_card_game/MemoryCard';
import WordSearchGame from './components/word_search_game/WordSearchGame';
import Puzzle from './components/puzzle/Puzzle';
import Home from './components/home/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route index element ={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="home/tictactoe" element={<Tictactoe />} />
      <Route path="home/rockpaperscissors" element={<RockPapperScissors />} />
      <Route path="home/memorycard" element={<MemoryCard />} />
      <Route path="home/wordsearchgame" element={<WordSearchGame />} />
      <Route path="home/puzzle" element={<Puzzle />} />
      <Route path="tictactoe" element={<Tictactoe />} />
      <Route path="rockpaperscissors" element={<RockPapperScissors />} />
      <Route path="memorycard" element={<MemoryCard />} />
      <Route path="wordsearchgame" element={<WordSearchGame />} />
      <Route path="puzzle" element={<Puzzle />} />


     
    </Route>
    
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
};

export default App;
