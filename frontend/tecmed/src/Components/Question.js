import React, { useState, useEffect } from "react";
import '../css/Home.css'

const Question = (props) => {
    
    const [isClicked, setIsClicked] = useState(null)
    
    const clicked = (e) => {
        checkAnswer(e.currentTarget.name)
        console.log("A")
        console.log(e.currentTarget.name)        
    }

    const checkAnswer = (answer) => {
        if (answer === props.correctAnswer){
            //acertou a questao
            setIsClicked(true)
        }
        else {
            setIsClicked(false)
        }
    }

    if (isClicked === null){
        return(
            <div className='Question'>
                
                <h4>{props.question}</h4>
    
                {props.listAnswer.map((answer) => (
                    <div> 
                    <button className="enter" onClick={clicked} value={answer} name={answer} type="submit"> {answer} </button>    
                    </div>
    
            ))}
    
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
            <h4> Você errou :( </h4>

        </div>)
    }

}


export default Question;