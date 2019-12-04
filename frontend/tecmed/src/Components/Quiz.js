import {Link, Route, Redirect, Router} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css';
import axios from 'axios';

const Quiz = ({videoId, usr}) => {

    const postQuiz = (alternatives, question, difficulty) => {
        axios.post(`http://localhost/routes/updateVideoQuiz/${videoId}`, {alternatives: alternatives, question: question, difficulty: difficulty})
        axios.post(`http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/updateReviewStatus/${videoId}`, {reviewer: usr})
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

        question = document.getElementById('pergunta').value;
        alternatives = [document.getElementById('r1').value, document.getElementById('r2').value, document.getElementById('r3').value]
        
        if (document.getElementById(`level1`).checked){
            difficulty = 'facil'
        }
        if (document.getElementById(`level2`).checked){
            difficulty = 'intermediária'
        }
        if (document.getElementById(`level3`).checked){
            difficulty = 'avançada'   
        }
        
        document.getElementById('pergunta').value='';
        document.getElementById('r1').value='';
        document.getElementById('r2').value='';
        document.getElementById('r3').value='';

        alert('Pergunta enviada! Se desejar, faça mais uma ou clique em voltar para Home para voltar para página inicial.')
        postQuiz(alternatives, question, difficulty)
    }

    return(
    <center>
        <div className='Quiz'>
            <form className='quizForm' onSubmit={salvaDados}>

                <h1>Pergunta:</h1> 

                <input type='radio' className='radioButtonLevel' id="level1" name='level' value='facil' checked/> Fácil 
                <input style={{marginLeft:"1rem"}} type='radio' className='radioButtonLevel' id="level2" name='level' value='intermed'/> Intermediaria
                <input style={{marginLeft:"1rem"}} type='radio' className='radioButtonLevel' id="level3" name='level' value='avan'/> Avançada
                <br/>

                <input type='text' className='pergunta' id='pergunta'/> <br/><br/>

                <input type='text' className='respostaCerta' id='r1'/> <br/>
                <input type='text' className='resposta' id='r2'/> <br/>
                <input type='text' className='resposta' id='r3'/> <br/>
                <br/>
        
                <div className='voltar'>
                    <Link to ='/' style={{textDecoration: 'none'}}>
                        <p className='voltarhome'>Voltar para Home</p>
                    </Link>

                    <input type='submit' className='button'/>
                    <br/>
                </div>

            </form>          
        </div>
        </center>
    );
}


export default Quiz;