import React, {useState, useEffect} from 'react'
import HumanP from './HumanP'
import ComputerP from './ComputerP'
import { NavLink, Outlet, useNavigate} from "react-router-dom"
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
  const dispatch = useDispatch();
  useEffect(() => {
    let timeoutId;
    if(count === 0){
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
  }, [start, count]);
  
  const winner = determineWinner(hum, name[com]);
  const status3 = useSelector(selectGame3);
  useEffect(() => {
    if (winner) {
      dispatch(game3());
    }
  }, [winner, dispatch]);  

  return (
    <div>
      <div>
        {status3&&<NavLink to="../home">Home</NavLink>}
      </div>
   
      {count}
      <ComputerP/>
      {count=== 0 ? <div>
        <p>{winner}</p>
        <p>Computer: {name[com]} </p>
        <h1>{choice[com]}</h1>
        <p>Human: {hum}</p>
      </div>: <div></div>
        }
      <HumanP setHum = {setHum}  start = {start} /> 
      {count ===5 || count === 0 ?<button 
        onClick={()=>{
          setStart(true);
          setCount(5);
          setCom(Math.floor(Math.random() * 3));
      }}>Start</button>:<></>}

    </div>
  )
}

export default RockPapperScissors