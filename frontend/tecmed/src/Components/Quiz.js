import {Link, Redirect} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css'


const Quiz = ({videoId, usr}) => {

    const salvaDados = e => {
        e.preventDefault();

        const quiz = {'perg':"", '1': ["", false], '2': ["", false], '3': ["", false]};
        const post = [quiz, videoId]

        let r;
        
        const p = document.getElementById('pergunta').value
        const r1 = document.getElementById('r1').value
        const r2 = document.getElementById('r2').value
        const r3 = document.getElementById('r3').value
        
        const table = {'r1':r1, 'r2':r2, 'r3':r3};

        quiz['perg'] = p

        for (let i =1; i<=document.getElementsByName('certa').length; i++){
            if (document.getElementById(`resp${i}`).checked){
                quiz[`${i}`] = [table[`r${i}`], true]
                r = document.getElementById(`resp${i}`).value;
            }
            else{
                quiz[`${i}`] = [table[`r${i}`], false]
            }
        }

        alert('Resposta enviada! Obrigado.')

        console.log(r)
        console.log(p)
        console.log(r1)
        console.log(r2)
        console.log(r3)
        console.log(post)

        return <Redirect to='/'/>
            
    }

    return(

        <div className='Quiz'>
            <form className='quizForm' onSubmit={salvaDados}>

                <input type='text' className='pergunta' id='pergunta'/> <br/><br/>

                <input type='radio' className='radioButton' id="resp1" name='certa' value='a'/>
                <input type='text' className='resposta' id='r1'/> <br/>

                <input type='radio' className='radioButton' id="resp2" name='certa' value='b' checked/>
                <input type='text' className='resposta' id='r2'/> <br/>

                <input type='radio' className='radioButton' id="resp3" name='certa' value='c'/>
                <input type='text' className='resposta' id='r3'/> <br/>

                <input type='submit' className='button'/>

            </form>          
        </div>
    );
}


export default Quiz;