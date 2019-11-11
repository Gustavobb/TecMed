import React from 'react';
import '../css/Review.css'
import Quiz from '../Components/Quiz.js'
import {Link} from 'react-router-dom';


const Review2 = ({match}) => {

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
                <h1>Obrigado {match.params.usr} pela avaliação!</h1>
                <p className='texto1'>O vídeo foi devidamente avaliado e não será adicionado ao site.</p>
            </div>
        );
    }
    else{
        return(
            <div className='Review'>
                <h1>Obrigado {match.params.usr} pela avaliação!</h1>
                <p className='texto1'>
                    Pergunta 1: <b className='nota'>{r1}</b> Pergunta 2: <b className='nota'>{r2}</b> Pergunta 3: <b className='nota'>{r3}</b>
                </p>
                <p className='texto1-1'>Para nossa última etapa, formule um quiz com até 3 perguntas (uma fácil, uma intermediária e uma avançada) sobre o assunto do conteúdo.</p>
                
                <Quiz
                    videoId={match.params.id}
                    usr={match.params.usr}
                />

            </div>
        );
    }
}


export default Review2;