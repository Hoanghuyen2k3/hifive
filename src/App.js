import React, {useEffect} from 'react';
import './App.scss';
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
import {useDispatch, useSelector} from 'react-redux';
import { selectGame1, selectGame2, selectGame3, selectGame4, selectGame5 , turn, selectSwitch} from './features/counterSlice';

const App = () => {
  const status1 = useSelector(selectGame1);
  const status2 = useSelector(selectGame2);

  const status3 = useSelector(selectGame3);

  const status4 = useSelector(selectGame4);

  const status5 = useSelector(selectGame5);
  const dispatch = useDispatch();

  const black = useSelector(selectSwitch);
  const handC =()=>{
    dispatch(turn());
  }
  useEffect(()=>{
    console.log(black);
  }, [black])

  

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
    <div className={black ? "App blackMode":"App"}>
      <RouterProvider router={router} />
      
      <button className="switch" onClick={handC}>⚫⚪</button>
      <p>{black}</p>
      
      <div className="banner">
          <div className={status1? "reg yellow" : "reg"}></div>
          <div className={status2? "reg yellow" : "reg"}></div>
          <div className={status3? "reg yellow" : "reg"}></div>
          <div className={status4? "reg yellow" : "reg"}></div>
          <div className={status5? "reg yellow" : "reg"}></div>
      </div>
    </div>
  );
};

export default App;
