import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'

import axios from "axios"

const Question = (props) => {
    
    const [isClicked, setIsClicked] = useState(null)
    
    const clicked = (e) => {
        checkAnswer(e.currentTarget.value)      
    }

    const checkAnswer = (answer) => {
        if (answer === props.correct) { 
            setIsClicked(true)
            //acertou -> dar update em score da tabela usuarios
            var id = "5dd3235a1095e84d7820949b" //pegando um id qualquer
            if (props.difficulty === "Fácil"){
                var score = 10
            }
            else if (props.difficulty === "Médio"){
                var score = 20
            }
            else if (props.difficulty === "Difícil"){
                var score = 30
            }
            else { //quando nao esta marcado a dificuldade (depois nao vai ter questoes sem especificacao)
                var score = 10
            }
            insertScore (id, score)
        }
        else {
            //errou
            setIsClicked(false)
        }
    }

    const insertScore = async (id, score)=> {
        console.log("ENTROU AQUI")
        await axios.post("http://localhost:9000/routes/updateScore",
        {
            id : id,
            score : score
            
        })
            return true
    } 
    

    if (isClicked === null){
        return(
            <div className='Question'>
                
                <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
                
                <h4>{props.question}</h4>


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
        return (<div>ACERTOU!</div>)
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