import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'

import axios from "axios"

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
            //acertou -> dar update em score da tabela usuarios
            var _id = "5dc87bf30c81121153e99bba" //pegando um id qualquer
            var score = 10 //depois mudar pontuacao conforme questao facil, medio, dificil
            console.log(_id)
            
            insertScore (_id, score)
        }
        else {
            //errou
            setIsClicked(false)
        }
    }
///////////////////
    const insertScore = async (_id, score)=> {
        console.log("ENTROU AQUI")
        await axios.post("http://localhost:9000/updateScore",{
            params:{
                _id,score
            }
        })
            return true
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