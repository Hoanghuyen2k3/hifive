import React from 'react'
import { NavLink, Outlet, useNavigate} from "react-router-dom"

function Home() {
  return (
    <div>
        <h1>Home</h1>
        <NavLink to="tictactoe">Tictactoe</NavLink>
        <NavLink to="rockpaperscissors">Rock</NavLink>
        <NavLink to="memorycard">Mem</NavLink>
        <NavLink to="puzzle">Puzzle</NavLink>
        <NavLink to="wordsearchgame" >Word</NavLink> 
    </div>
 )
}

export default Home