import {Link, Redirect} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css';


const Quiz = ({videoId, usr}) => {

    const salvaDados = e => {
        e.preventDefault();

        const quiz = {
            question1: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            },

            question2: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            }, 

            question3: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            }
        }
    
        
        const post = [quiz, videoId];
        
        
        quiz.question1.question = document.getElementById('pergunta1').value;
        
        quiz.question1.answers.answer1.text = document.getElementById('r1.1').value;
        quiz.question1.answers.answer2.text = document.getElementById('r1.2').value;
        quiz.question1.answers.answer3.text = document.getElementById('r1.3').value;
        
        quiz.question2.question = document.getElementById('pergunta2').value;

        quiz.question2.answers.answer1.text = document.getElementById('r2.1').value;
        quiz.question2.answers.answer2.text = document.getElementById('r2.2').value;
        quiz.question2.answers.answer3.text = document.getElementById('r2.3').value;
        
        quiz.question3.question = document.getElementById('pergunta3').value;

        quiz.question3.answers.answer1.text = document.getElementById('r3.1').value;
        quiz.question3.answers.answer2.text = document.getElementById('r3.2').value;
        quiz.question3.answers.answer3.text = document.getElementById('r3.3').value;


        for (let i =1; i<= 3; i++){
            if (document.getElementById(`level${i}f`).checked){
                quiz[`question${i}`]['level'] = 'facil'
            }
            if (document.getElementById(`level${i}i`).checked){
                quiz[`question${i}`]['level'] = 'intermediária'
            }
            if (document.getElementById(`level${i}a`).checked){
                quiz[`question${i}`]['level'] = 'avançada'   
            }
        
        }


        for (let i =1; i<= 3; i++){
            if (document.getElementById(`resp1.${i}`).checked){
                quiz.question1.answers[`answer${i}`]['correct'] = true
            }
            else{
                quiz.question1.answers[`answer${i}`]['correct'] = false
            }
        }
        for (let i =1; i<= 3; i++){
            if (document.getElementById(`resp2.${i}`).checked){
                quiz.question2.answers[`answer${i}`]['correct'] = true
            }
            else{
                quiz.question2.answers[`answer${i}`]['correct'] = false
            }
        }
        for (let i =1; i<= 3; i++){
            if (document.getElementById(`resp3.${i}`).checked){
                quiz.question3.answers[`answer${i}`]['correct'] = true
            }
            else{
                quiz.question3.answers[`answer${i}`]['correct'] = false
            }
        }


        alert('Resposta enviada! Obrigado.')

        console.log(post)      

    }

    return(

        <div className='Quiz'>
            <form className='quizForm' onSubmit={salvaDados}>

                <h1>Pergunta 1:</h1> 

                <input type='radio' className='radioButtonLevel' id="level1f" name='level1' value='facil' checked/> Fácil 
                <input type='radio' className='radioButtonLevel' id="level1i" name='level1' value='intermed'/> Intermediaria
                <input type='radio' className='radioButtonLevel' id="level1a" name='level1' value='avan'/> Avançada
                <br/>

                <input type='text' className='pergunta' id='pergunta1'/> <br/><br/>

                <input type='radio' className='radioButton' id="resp1.1" name='certa1' value='a'/>
                <input type='text' className='resposta' id='r1.1'/> <br/>

                <input type='radio' className='radioButton' id="resp1.2" name='certa1' value='b' checked/>
                <input type='text' className='resposta' id='r1.2'/> <br/>

                <input type='radio' className='radioButton' id="resp1.3" name='certa1' value='c'/>
                <input type='text' className='resposta' id='r1.3'/> <br/>
                <br/>

                <h1>Pergunta 2:</h1>

                <input type='radio' className='radioButtonLevel' id="level2f" name='level2' value='facil'/> Fácil 
                <input type='radio' className='radioButtonLevel' id="level2i" name='level2' value='intermed' checked/> Intermediaria
                <input type='radio' className='radioButtonLevel' id="level2a" name='level2' value='avan'/> Avançada
                <br/>

                <input type='text' className='pergunta' id='pergunta2'/> <br/><br/>

                <input type='radio' className='radioButton' id="resp2.1" name='certa2' value='a'/>
                <input type='text' className='resposta' id='r2.1'/> <br/>

                <input type='radio' className='radioButton' id="resp2.2" name='certa2' value='b'/>
                <input type='text' className='resposta' id='r2.2'/> <br/>

                <input type='radio' className='radioButton' id="resp2.3" name='certa2' value='c' checked/>
                <input type='text' className='resposta' id='r2.3'/> <br/>
                <br/>

                <h1>Pergunta 3:</h1>

                <input type='radio' className='radioButtonLevel' id="level3f" name='level3' value='facil'/> Fácil 
                <input type='radio' className='radioButtonLevel' id="level3i" name='level3' value='intermed'/> Intermediaria
                <input type='radio' className='radioButtonLevel' id="level3a" name='level3' value='avan' checked/> Avançada
                <br/>

                <input type='text' className='pergunta' id='pergunta3'/> <br/><br/>

                <input type='radio' className='radioButton' id="resp3.1" name='certa3' value='a' checked/>
                <input type='text' className='resposta' id='r3.1'/> <br/>

                <input type='radio' className='radioButton' id="resp3.2" name='certa3' value='b'/>
                <input type='text' className='resposta' id='r3.2'/> <br/>

                <input type='radio' className='radioButton' id="resp3.3" name='certa3' value='c'/>
                <input type='text' className='resposta' id='r3.3'/> <br/>
                <br/>

                <input type='submit' className='button'/>

            </form>          
        </div>
    );
}


export default Quiz;