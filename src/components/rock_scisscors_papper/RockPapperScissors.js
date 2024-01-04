import React, {useState, useEffect} from 'react'
import HumanP from './HumanP'
import "./Rock.scss"
import { NavLink} from "react-router-dom"
import { game3, selectGame3 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import win from "../audio/win.mp3";

function determineWinner(playerChoice, computerChoice) {
  const choices = ["rock", "paper", "scissors"];

  if (!choices.includes(playerChoice) || !choices.includes(computerChoice)) {
    return "Invalid choices";
  }

  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}


function RockPapperScissors() {
  const choice = ["✊️",  "🖐",  "✌️"];
  const name = [ "rock", "paper", "scissors"];

  const [count, setCount] = useState(5);
  const [com, setCom] = useState(null);
  const [hum, setHum] = useState(null);
  const [start, setStart] = useState(false);
  const [winner, setWinner] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let timeoutId;
    if(count === 0){
      setWinner(determineWinner(hum, name[com]));

      setStart(false);
    }
    if (count > 0 && start) {
      timeoutId = setTimeout(() => {
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);
    }
    
  
    return () => {
      // Cleanup function to clear the timeout when the component is unmounted
      clearTimeout(timeoutId);
    };
  }, [start, count, com, hum, name]);
  
  const status3 = useSelector(selectGame3);

  
  useEffect(() => {
    const audio = new Audio(win);

    console.log(winner)
    if (winner) {
      dispatch(game3());
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
  }, [winner, dispatch]);  

  return (
    <div className="rock-game">
      <h1 className="rock-game-h1">Rock Papper Scissors</h1>
      <h2 className="rock-game-h2">Display your hand in front of the webcam and dive into the interactive realm of Rock, Paper, Scissors using our cutting-edge webcam feature! The goal is straightforward: engage in a showdown with the computer by presenting your hand pose—Rock, Paper, or Scissors. As the game commences, you have a brief 5 seconds to finalize your decision, and our webcam will capture your selected pose. Can you outwit the computer with the ideal move?</h2>
      <div className="redirect">
            {
                status3 && <NavLink className="point-to-home" to="../home">Next Game</NavLink>
            }
        </div>  
        {count ===5 || count === 0 ?
        <button 
          className="rock-start"
          onClick={()=>{
            setStart(true);
            setCount(5);
            setCom(Math.floor(Math.random() * 3));
        }}>Start</button>:<></>}

        <p className="count">{count}</p>
      {count=== 0 ? 
      <div>
        <p className="result">{winner}</p>
        {/* <p>Computer: {name[com]} </p>
        <h1>{choice[com]}</h1> */}
        <p>Human: {hum}</p> 
      </div>: <div></div>
        }

      <div className="player">
        <div className="computer">
          <h2>Computer</h2>
          <div className="comp-choice">
            {
              count===5? <h1>✊️🖐✌️</h1>:(count ===4?  <h1>✊️</h1>:(count ===3? <h1>🖐</h1>:(count ===2? <h1>✌️</h1>:(count ===1?  <h1>✊️</h1>: <h1>{choice[com]}</h1>))))
            }
          </div>


        </div>

        <HumanP setHum = {setHum}  start = {start} /> 

      </div>
      

    </div>
  )
}

export default RockPapperScissors