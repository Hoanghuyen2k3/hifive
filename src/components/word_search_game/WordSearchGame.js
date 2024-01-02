import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate} from "react-router-dom"
import { game5, selectGame5 } from '../../features/counterSlice';
import {useDispatch, useSelector} from 'react-redux';

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
    if (submitW.length ===wordList.length) {
      dispatch(game5());
    }
  })

  useEffect(() => {
    const sortedSelectedWord = selectedWord.sort((a, b) => a.index - b.index);
    console.log("selected word:", selectedWord);
    console.log("selected cell: ", selectedCells)
    const wordValues = sortedSelectedWord.map((item) => item.value);
  
    const words = wordValues.join('');
    setWord(words);
  
    if (wordList.includes(words)) {
      alert(`Congratulations! You found the word: ${words}`);
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

  return (
    <div>
      <h1>Word Search Game</h1>
      <div>
            {status5&&<NavLink to="../home">Home</NavLink>}
          </div>

      <div>
       
        <button onClick={submitWord}>Submit Word</button>
      </div>
      <div>
        <p>Selected Word: {word}</p>
        {grid.map((value, index) => (
            <React.Fragment key={index}>
                <button 
                    value ={value} className="square" 
                    onClick={()=>handleCellClick(value, index)}
                    >{value}
                </button>
            
            {(index + 1) % (grid.length/12) === 0 && index !== grid.length - 1 && <br />}
            </React.Fragment>
        ))}
        <div >
            {firstLine.map((word, index) => (
            <p key={index}>{word}</p>
            ))}
        </div>
        <div>
            {secondLine.map((word, index) => (
            <p key={index + 4}>{word}</p>
            ))}
        </div>

      </div>
    </div>
  );
};

export default WordSearchGame;
