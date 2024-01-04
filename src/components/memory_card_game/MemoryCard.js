import React, {useState, useEffect} from 'react'
import { game1, selectGame1 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import "./Memory.css";
import win from "../audio/win.mp3";
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
const card = ["🍀","🔥","🌟","🌵","🌷","🪴","🌷","🪴","☃️","🎄","☃️","🎄","🍀","🔥","🌟","🌵"]

function MemoryCard() {
    const [click, setClick]= useState([]);
    const [count, setCount] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const dispatch = useDispatch();
    const status1 = useSelector(selectGame1);
    console.log("status1", status1);

  
    useEffect(()=>{
        shuffleArray(card);
    },[])
    console.log(card);
    useEffect(()=>{
        if(count === 8){
            dispatch(game1());
        }
        if(answers.length ===2){
            setTimeout(()=>{
                if(answers[0].value ===answers[1].value){
                    setCount(count+1);
                    
                }
                else if (answers[0].value !==answers[1].value){
                    if (click.length >2){
    
                    
                        setClick((click) => click.slice(0, -2));
                        setDisabledButtons((prevDisabledButtons) => prevDisabledButtons.slice(0, -2));
                    }
                    else{
                        setClick([]);
                        setDisabledButtons([]);
                    }
                }
                setAnswers([]);
            }, 200);
            
        }
    }, [answers, count, click])

    const handleClick = (value, index) => {
        !click.find((item) => item.index === index) &&  !disabledButtons.includes(index) && setClick((click)=>[...click,{value:value, index : index}]);
        !answers.find((item) => item.index === index) && !disabledButtons.includes(index) &&setAnswers((answer) => [...answer,{value:value, index : index}])
        !disabledButtons.includes(index)&&setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, index,]);
    }

    useEffect(() => {
        const audio = new Audio(win);
    
        if (count ===8) {
          audio.play();
        //   audio.loop = true;
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
    
        // Cleanup when the component is unmounted
        return () => {
          audio.pause();
          audio.currentTime = 0;
        };
      }, [count]);

  return (
    <div className="memory">
        <h1 className="memory-h1">Memory Card Game</h1>
        <h2 className="memory-span">Your goal is to match pairs of cards with identical symbols. Symply click to flip a card, then click another to find its match. Matched pairs remain face-up, while non-matches flip back down. Win by matching all card pairs!</h2>

        <div className="redirect">
            <h1 className="redirect-h1">👉</h1>
            {
                status1 && <NavLink className="point-to-home" to="../home">Next Game</NavLink>
            }
        </div>
        
        <div className="memory-card">
            {/* <h1>{count}</h1> */}
            {card.map((value, index) => (
                <React.Fragment key={index}>
                    <button 
                        value ={value} className="square" 
                        // disabled={disabledButtons.includes(index)}
                        onClick={() => handleClick(value, index)}>
                        {click.find((item) => item.index === index) ? <span className="card" >{value}</span> : <span className="card black" >{"🔍"}</span>}
                    </button>

                
                {(index + 1) % (card.length/4) === 0 && index !== card.length - 1 && <br />}  
                </React.Fragment>
            ))}
        </div>
        
       
       
        
    </div>
  )
}

export default MemoryCard