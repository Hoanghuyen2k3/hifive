import React, {useState, useEffect} from 'react'

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

  
    useEffect(()=>{
        shuffleArray(card);
    },[])
    console.log(card);
    useEffect(()=>{
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