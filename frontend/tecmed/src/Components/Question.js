import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import axios from "axios"

const Question = (props) => {
    
    const [isClicked, setIsClicked] = useState(null)
    
    const clicked = async (e) => {
    
        checkAnswer(e.currentTarget.value)
        await axios.post("http://localhost/updateView", {
            id: props.id
        })      
    }

    const checkAnswer = (answer) => {
        if (answer === props.correct) { 
            setIsClicked(true)
            //acertou -> dar update em score da tabela usuarios
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
            insertScore (props.id, score)
        }
        else {
            //errou
            setIsClicked(false)
        }
    }

    const insertScore = async (id, score)=> {
        await axios.post("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/updateScore",
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
                    <center><button className="btn btn-lg btn-primary btn-block" style={{width: "40%", marginTop:"1rem", fontSize: "1rem"}} onClick={clicked} value={alternativa} name={alternativa}> <b></b> {alternativa} </button></center> 
                    )}   
                </div>   
            </div>
        );

    }
    
    if (isClicked)
    {
        return (<div>
            <p> ACERTOU! </p>
            <Link to="/">
            <Button variant="primary" type="submit" style={{marginTop: "1rem"}} >
                                    Voltar
            </Button>
            </Link>

        </div>)
        
    }
    else if (!isClicked)
    {
        return (
        <div>
            <p> Você errou. </p> <br></br>
            <Link to="/">
            <Button variant="primary" type="submit" style={{marginTop: "1rem"}} >
                                    Voltar
            </Button>
            </Link>
            
            

        </div>)
    }

}


export default Question;