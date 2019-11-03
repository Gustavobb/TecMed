import React from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'

const Quiz = () => {

    var urlParams = new URLSearchParams(window.location.search);
    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    
    const r1 = getUrlParameter('resposta1');
    const r2 = getUrlParameter('resposta2');
    const r3 = getUrlParameter('resposta3');

    console.log(r1, r2, r3)
    
    return(
        <div className='Review'>
            <h1>sente só:</h1>
            <p>
                resposta1: <h2>{r1}</h2> resposta2: <h2>{r2}</h2> resposta3: <h2>{r3}</h2>
            </p>
            <h1 method='get'></h1>
        </div>
    );
}


export default Quiz;