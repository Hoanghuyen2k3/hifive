import React, {useState, useEffect} from 'react'
import { game1, selectGame1 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, Outlet, useNavigate} from "react-router-dom"

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
        }
    }, [answers, count, click])

    const handleClick = (value, index) => {
        setClick((click)=>[...click,{value:value, index : index}]);
        setAnswers((answer) => [...answer,{value:value, index : index}])
        setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, index,
        ]);
    }

  return (
    <div>
        <div>
            {
                status1 && <NavLink to="../home">Home</NavLink>
            }
        </div>
       <h1>{count}</h1>
        {card.map((value, index) => (
            <React.Fragment key={index}>
                <button 
                    value ={value} className="square" 
                    disabled={disabledButtons.includes(index)}
                    onClick={() => handleClick(value, index)}>
                        {click.find((item) => item.index === index) && value}
                </button>
            
            {(index + 1) % (card.length/4) === 0 && index !== card.length - 1 && <br />}
            </React.Fragment>
        ))}
        
    </div>
  )
}

export default MemoryCard