import React from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'
import {Link} from 'react-router-dom';


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
    console.log(r1 < 5, r2 < 5, r3 < 5)

    if(r1 < 5 || r2 < 5 || r3 < 5){
        return(
            <div className='Review'>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <h2>voltar para home</h2>
                </Link>
                <h1>Obrigado pela avaliação!</h1>
                <p className='texto1'>O vídeo foi devidamente avaliado e não será adicionado ao site.</p>
            </div>
        );
    }
    else{
        return(
            <div className='Review'>
                <h1>Obrigado pela avaliação!</h1>
                <p>
                    resposta1: <h2>{r1}</h2> resposta2: <h2>{r2}</h2> resposta3: <h2>{r3}</h2>
                </p>
                <h1 method='get'></h1>
            </div>
        );
    }
}


export default Quiz;