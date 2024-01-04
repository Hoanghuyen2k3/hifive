import React from 'react'
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import xoImage from '../images/xo.png';
import rock from '../images/rock.jpg';
import puzzle from '../images/puzzle.png';

import word from '../images/word.jpg';
import mem from '../images/mem.png';
import "./Home.scss"
function Home() {
  return (
    <div className="home">
        <h1 className="homeh1">HiFive</h1>
        <p>Welcome to the Ultimate Game Box - your one-stop destination for endless fun and excitement! Dive into a world of entertainment with our carefully curated selection of five captivating games. Whether you're a master strategist, a wordsmith, or a puzzle enthusiast, there's something for everyone in the Ultimate Game Box.</p>
        <h2>Explore, challenge yourself, and let the games begin!</h2>
        
        <div className="options">
          <NavLink to="memorycard"><img src={mem} alt ="Memory card" /></NavLink>
          <NavLink to="tictactoe"><img src={xoImage} alt ="tictactoe" /></NavLink>
          <NavLink to="rockpaperscissors"><img src={rock} alt ="rock papers cissors" /></NavLink>
          <NavLink to="puzzle"><img src={puzzle} alt ="puzzle" /></NavLink>
          <NavLink to="wordsearchgame" ><img src={word} alt ="word search game" /></NavLink> 

        </div>

        
        

        
        
    </div>
 )
}

export default Home