import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import '../css/Quiz.css'


const Quiz = ({videoId, usr}) => {
    
    return(
        <div className='Quiz'>
            <form action='/' className='quizForm'>

                <input type='text' className='pergunta'/> <br/><br/>

                <input name='quiz' className='radioButton' type='radio'/>
                <input type='text' className='resposta'/> <br/>

                <input name='quiz' className='radioButton' type='radio' checked/>
                <input type='text' className='resposta'/> <br/>

                <input name='quiz' className='radioButton' type='radio'/>
                <input type='text' className='resposta'/> <br/>

                <input type='submit' className='button'/>

            </form>          
        </div>
    );
}


export default Quiz;