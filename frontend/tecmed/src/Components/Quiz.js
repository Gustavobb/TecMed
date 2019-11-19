import {Link, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css';
import axios from 'axios';

const Quiz = ({videoId, usr}) => {

    const postQuiz = (alternatives, question, difficulty) =>{
        axios.post(`http://localhost:9000/routes/updateVideoQuiz/${videoId}`, {alternatives: alternatives, question: question, difficulty: difficulty})
    }

    const salvaDados = e => {
        e.preventDefault();

        const quiz = 
            {
                difficulty: String,
                question: String,
                alternatives: [String]
            }

        var difficulty =  String

        var question = String

        var alternatives = []

        difficulty = 'fácil'
        question = document.getElementById('pergunta1').value;
        alternatives = [document.getElementById('r1.1').value, document.getElementById('r1.2').value, document.getElementById('r1.3').value]
    
        alert('Resposta enviada! Obrigado.')
        
        postQuiz(alternatives, question, difficulty)

    }

    return(

        <div className='Quiz'>
            <form className='quizForm' onSubmit={salvaDados}>


                <h1>Pergunta Fácil:</h1> 

                <input type='text' className='pergunta' id='pergunta1'/> <br/><br/>

                <input type='text' className='resposta' id='r1.1'/> <br/>
                <input type='text' className='resposta' id='r1.2'/> <br/>
                <input type='text' className='resposta' id='r1.3'/> <br/>
                <br/>


                <h1>Pergunta Intermediária:</h1>

                <input type='text' className='pergunta' id='pergunta2'/> <br/><br/>

                <input type='text' className='resposta' id='r2.1'/> <br/>
                <input type='text' className='resposta' id='r2.2'/> <br/>
                <input type='text' className='resposta' id='r2.3'/> <br/>
                <br/>


                <h1>Pergunta Avançada:</h1>

                <input type='text' className='pergunta' id='pergunta3'/> <br/><br/>

                <input type='text' className='resposta' id='r3.1'/> <br/>
                <input type='text' className='resposta' id='r3.2'/> <br/>
                <input type='text' className='resposta' id='r3.3'/> <br/>
                <br/>
        
                <input type='submit' className='button'/>

                <br/>

                <Link to ='/' style={{textDecoration: 'none'}}>
                    <p className='voltarhome'>Voltar para Home</p>
                </Link>

            </form>          
        </div>
    );
}


export default Quiz;