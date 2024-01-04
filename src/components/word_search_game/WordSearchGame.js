import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import { game5, selectGame5 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import "./WordSearch.scss"
import win from "../audio/win.mp3";

const grid = [
    "N", "O", "D", "E", "P", "I", "Z", "O", "C", "A", "W", "G", 
    "A", "B", "E", "Q", "N", "J", "J", "I", "V", "B", "C", "Z", 
    "E", "T", "V", "R", "E", "A", "C", "T", "B", "J", "B", "I", 
    "X", "H", "X", "Q", "R", "V", "W", "S", "N", "C", "U", "O", 
    "P", "B", "T", "J", "K", "A", "E", "G", "M", "K", "S", "Y", 
    "R", "U", "P", "M", "L", "S", "R", "D", "R", "L", "T", "S", 
    "E", "Q", "A", "O", "L", "C", "T", "F", "E", "A", "X", "E", 
    "S", "W", "S", "N", "Z", "R", "Y", "G", "D", "M", "P", "V", 
    "S", "E", "D", "G", "X", "I", "U", "H", "U", "T", "W", "H", 
    "T", "R", "F", "0", "C", "P", "I", "J", "X", "O", "B", "P", 
    "Y", "U", "G", "D", "V", "T", "O", "K", "L", "Q", "R", "C", 
    "I", "O", "H", "B", "B", "Q", "P", "Z", "X", "A", "S", "X", 
]
const hintWord =[
  {
      "value": "R",
      "index": 27
  },
  {
      "value": "E",
      "index": 28
  },
  {
      "value": "A",
      "index": 29
  },
  {
      "value": "C",
      "index": 30
  },
  {
      "value": "T",
      "index": 31
  },
  {
      "value": "J",
      "index": 17
  },
  {
      "value": "A",
      "index": 29
  },
  {
      "value": "V",
      "index": 41
  },
  {
      "value": "A",
      "index": 53
  },
  {
      "value": "S",
      "index": 65
  },
  {
      "value": "C",
      "index": 77
  },
  {
      "value": "R",
      "index": 89
  },
  {
      "value": "I",
      "index": 101
  },
  {
      "value": "P",
      "index": 113
  },
  {
      "value": "T",
      "index": 125
  },
  {
      "value": "E",
      "index": 24
  },
  {
      "value": "X",
      "index": 36
  },
  {
      "value": "P",
      "index": 48
  },
  {
      "value": "R",
      "index": 60
  },
  {
      "value": "E",
      "index": 72
  },
  {
      "value": "S",
      "index": 84
  },
  {
      "value": "S",
      "index": 96
  },
  {
      "value": "H",
      "index": 37
  },
  {
      "value": "T",
      "index": 50
  },
  {
      "value": "M",
      "index": 63
  },
  {
      "value": "L",
      "index": 76
  },
  {
      "value": "C",
      "index": 45
  },
  {
      "value": "S",
      "index": 58
  },
  {
      "value": "S",
      "index": 71
  },
  {
      "value": "N",
      "index": 0
  },
  {
      "value": "O",
      "index": 1
  },
  {
      "value": "D",
      "index": 2
  },
  {
      "value": "E",
      "index": 3
  }
]
const wordList = [
    'REACT',
    'JAVASCRIPT',
    'HTML',
    'CSS',
    'NODE',
    'EXPRESS',
    // 'MONGODB',
    // 'REDUX',
    // 'GRAPHQL'
  ];
  const firstLine = wordList.slice(0, 4);
  const secondLine = wordList.slice(4);
const WordSearchGame = () => {
  
  const [selectedWord, setSelectedWord] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [word, setWord] = useState('');
  const [submitW, setSubmitW] = useState([]);
  const [hint, setHint] = useState(false);
  const [hintW, setHintW] = useState([]);
  

  const dispatch = useDispatch();
  const status5 = useSelector(selectGame5);


  const checkIfCanInclude = (currentIndex) => {
    if (selectedWord.length === 0) {
      return true; // The first cell can always be included
    }

    const lastIndex = selectedWord[selectedWord.length - 1].index;

    // Check if the new cell is in a straight line with the last cell
    return (
      currentIndex - lastIndex === 1 || // Horizontal
      currentIndex - lastIndex === 12 || // Vertical
      currentIndex - lastIndex === 13 || // Diagonal
      currentIndex - lastIndex === 11 // Diagonal
    );
  };

  const handleCellClick = (value, index) => {
    const itemIndex = selectedWord.findIndex((item) => item.index === index);
    console.log("value:", value);
    console.log("index:", index);
    if (itemIndex !== -1) {
      // If the item is found, deselect it
      setSelectedWord((selectedWord) => selectedWord.filter((item) => item.index !== index));
    } else {
        const canInclude = checkIfCanInclude(index);
        if (canInclude) {
            setSelectedWord((selectedWord) => [...selectedWord, { value, index }]);

        }
        else{
            alert('Selected cells must be in a straight line (vertical, horizontal, or diagonal).');

        }
          
    }
  
    
  };

  useEffect(()=>{
    const audio = new Audio(win);

    if (submitW.length ===wordList.length) {
      dispatch(game5());
        audio.play();
    }else {
        audio.pause();
        audio.currentTime = 0;
      }
  
      // Cleanup when the component is unmounted
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
  }, [submitW])

  useEffect(() => {
    const sortedSelectedWord = selectedWord.sort((a, b) => a.index - b.index);
    console.log("selected word:", selectedWord);
    console.log("selected cell: ", selectedCells)
    const wordValues = sortedSelectedWord.map((item) => item.value);
  
    const words = wordValues.join('');
    setWord(words);
  
    if (wordList.includes(words)) {
      // alert(`Congratulations! You found the word: ${words}`);
      setSubmitW((submitW) => [...submitW, words]);
      setSelectedCells((selectedCells) => [...selectedCells, ...selectedWord]);
      setSelectedWord([]);


    }
    console.log("word: ", word);
  },[word, selectedCells, selectedWord]);

  
  const submitWord = () => {
    setSelectedWord([]);
    setWord('');
  };

  useEffect(()=>{
    hint? setHintW(hintWord):setHintW([]);
  }, [hint]);

  return (
    <div className="word-search">
      <h1 className="wordSearch-h1">Word Search Game</h1>
      <h2 className="wordSearch-h2">Embark on an engaging journey with our Word Search game, where your goal is to discover hidden words within a grid of characters. Simply click on a cell to select a character, and then continue selecting adjacent characters vertically, horizontally, or diagonally to form the words listed. Matched words stay highlighted, revealing your progress, while unselected characters return to their original state. The challenge intensifies as you strive to find and link all the words from the list to achieve victory. Exercise your word-finding skills, and remember, you can deselect a character by clicking on the cell again. Enjoy the thrill of conquering the Word Search puzzle!</h2>
      <div className="redirect">
            <h1 className="redirect-h1">👉</h1>
            {
                status5 && <NavLink className="point-to-home" to="../home">Next Game</NavLink>
            }
        </div>

      <div>
       
        <button className="wordSearch-submit" onClick={submitWord}>Submit Word</button>
      </div>
      <p className="selectW">Selected Word: {word}</p>
      <button className="hint-button" onClick={()=> setHint((hint) => !hint)}>💡</button>
      <div className="list">
        
        {grid.map((value, index) => (
            <React.Fragment key={index}>
                <button 
                    value ={value} 
                    className={selectedWord.find((item) => item.index === index) ? "word selectedWord" :(selectedCells.find((item) => item.index === index) ? "word selectedCells" : (hintW.find((item) => item.index === index)? "word hintWord": "word")) } 
                    onClick={()=>handleCellClick(value, index)}
                    >{value}
                </button>
            
            {(index + 1) % (grid.length/12) === 0 && index !== grid.length - 1 && <br />}
            </React.Fragment>
        ))}
        <div className="w1" >
            {firstLine.map((w, index) => (
            <p key={index} className={submitW.includes(w) ? "cross wordlists": "wordlists"}>{w}</p>
            ))}
        </div>
        <div className="w2">
            {secondLine.map((w, index) => (
            <p key={index + 4} className={submitW.includes(w) ? "cross wordlists": "wordlists"}>{w}</p>
            ))}
        </div>

      </div>
    </div>
  );
};

export default WordSearchGame;
