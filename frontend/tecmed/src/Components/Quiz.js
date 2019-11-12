import {Link, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css';
import axios from 'axios';

const Quiz = ({videoId, usr}) => {

    const postQuiz = (post) =>{
        axios.post(`http://localhost:9000/updateVideoQuiz/id?id=${videoId}`, post)
    }

    const salvaDados = e => {
        e.preventDefault();

        const quiz = [
            {
                difficulty: String,
                question: String,
                alternatives: [String]
            },

            {
                difficulty: String,
                question: String,
                alternatives: [String]
            },

            {
                difficulty: String,
                question: String,
                alternatives: [String]
            }
        ]
        

        quiz[0]['difficulty'] = 'facil'
        quiz[0]['question'] = document.getElementById('pergunta1').value;  
        quiz[0]['alternatives'] = [document.getElementById('r1.1').value, document.getElementById('r1.2').value, document.getElementById('r1.3').value]
        
        quiz[1]['difficulty'] = 'intermediária'
        quiz[1]['question'] = document.getElementById('pergunta2').value;
        quiz[1]['alternatives'] = [document.getElementById('r2.1').value, document.getElementById('r2.2').value, document.getElementById('r2.3').value]
        
        quiz[2]['difficulty'] = 'avançada'   
        quiz[2]['question'] = document.getElementById('pergunta3').value;
        quiz[2]['alternatives'] = [document.getElementById('r3.1').value, document.getElementById('r3.2').value, document.getElementById('r3.3').value]


        alert('Resposta enviada! Obrigado.')
        
        const post = {'id': videoId, 'quiz': quiz};
        console.log(post)  
        
        postQuiz(post)

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