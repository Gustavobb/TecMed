import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'

const Question = (props) => {
    
    const [isClicked, setIsClicked] = useState(null)
    
    const clicked = (e) => {
        checkAnswer(e.currentTarget.value)
        console.log("AAAAAAA")
        console.log(e.currentTarget.value)        
    }
//isAnswer1_1
    const checkAnswer = (answer) => {
        if (answer === props.correct) { 
        
            setIsClicked(true)
        }
        else {
            setIsClicked(false)
        }
    }

    if (isClicked === null){
        return(
            <div className='Question'>
                
                <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
                
                <h4>{props.question}</h4>
    
                {/* {props.listAnswer.map((answer) => (
                    <div> 
                        
                    <button className="enter" onClick={clicked} value={answer} name={answer} type="submit"> {answer} </button>    
                    </div>
    
            ))} */}

                <div>                   
                    {props.alternatives.map((alternativa)=>
                    <button className="enter" onClick={clicked} value={alternativa} name={alternativa}> <b></b> {alternativa} </button> 

                    )}   
   
   

                </div>   
            
    
            </div>
        );

    }

    if (isClicked)
    {
        return (<div>ACERTOU</div>)
    }
    else if (!isClicked)
    {
        return (
        <div>
            <p> Você errou :( </p>

        </div>)
    }

}


export default Question;