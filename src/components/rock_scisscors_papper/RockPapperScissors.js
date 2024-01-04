import React, {useState, useEffect} from 'react'
import HumanP from './HumanP'
import "./Rock.scss"
import { NavLink} from "react-router-dom"
import { game3, selectGame3 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
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
    console.log(winner)
    if (winner) {
      dispatch(game3());
    }
  }, [winner, dispatch]);  

  return (
    <div className="rock-game">
      <h1 className="rock-game-h1">Rock Papper Scissors</h1>
      <h2 className="rock-game-h2">Immerse yourself in the interactive world of Rock, Paper, Scissors with our innovative web cam feature! The objective is simple: face off against the computer by showcasing your hand pose—Rock, Paper, or Scissors. As the game kicks off, you have a swift 5 seconds to make your decision, and our web cam will capture your chosen pose. Will you outsmart the computer with the perfect move?</h2>
      <div className="redirect">
            <h1 className="redirect-h1">👉</h1>
            {
                status3 && <NavLink className="point-to-home" to="../home"> Game Box </NavLink>
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