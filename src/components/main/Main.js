import React, {useState, useEffect} from 'react'
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import { selectGame1, selectGame2, selectGame3, selectGame4, selectGame5 , turn, selectSwitch} from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import Sweet from "../audio/Sweet.mp3";
import { FaVolumeUp, FaVolumeMute  } from "react-icons/fa";

function Main() {
    const navigate = useNavigate();
    const status1 = useSelector(selectGame1);
    const status2 = useSelector(selectGame2);
  
    const status3 = useSelector(selectGame3);
  
    const status4 = useSelector(selectGame4);
  
    const status5 = useSelector(selectGame5);
    
    const [play, setPlay] = useState(false);
    
      useEffect(() => {
        const audio = new Audio(Sweet);
    
        if (play) {
          audio.play();
          audio.loop = true;
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
    
        // Cleanup when the component is unmounted
        return () => {
          audio.pause();
          audio.currentTime = 0;
        };
      }, [play]);

      
      
  return (
    <div className="main">
        <div className="main-audio" onClick={()=>setPlay((play)=>!play)}>{play ? <FaVolumeUp /> : <FaVolumeMute />} </div>
        
        <Outlet />

        <div className="banner">
          <div onClick={()=> navigate("/hifive/memorycard")} className={status1? "reg yellow" : "reg"}></div>
          <div onClick={()=> navigate("/hifive/tictactoe")} className={status2? "reg yellow" : "reg"}></div>
          <div onClick={()=> navigate("/hifive/rockpaperscissors")} className={status3? "reg yellow" : "reg"}></div>
          <div onClick={()=> navigate("/hifive/puzzle")} className={status4? "reg yellow" : "reg"}></div>
          <div onClick={()=> navigate("/hifive/wordsearchgame")} className={status5? "reg yellow" : "reg"}></div>
      </div>
    </div>
  )
}

export default Main