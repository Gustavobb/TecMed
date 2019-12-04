import React from 'react';
import Quiz from '../Components/Quiz.js'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';


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

    if(r1 < 1 || r2 < 1 || r3 < 1){
        return(
            <div className='Review'>
                <center style={{marginTop:"7rem"}}>
                <h1>Obrigado pela avaliação!</h1>
                <p className='texto1'>O vídeo foi devidamente avaliado e não será adicionado ao site.</p>
                <Link to='/' style={{textDecoration: 'none'}}>
                <Button type="submit" className="button">Voltar</Button>
                </Link>
                </center>
            </div>
        );
    }
    else{
        return(
            <div className='Review'>
                
                <h1>Obrigado pela avaliação!</h1>
                <p className='texto1'>
                    Pergunta 1: <b className='nota'>{r1}</b> Pergunta 2: <b className='nota'>{r2}</b> Pergunta 3: <b className='nota'>{r3}</b>
                </p>
                <p className='texto1'>Nota do vídeo: <b className='nota'>{Number(((parseInt(r1)+parseInt(r2)+parseInt(r3))/3).toFixed(1))}</b></p>
                <p className='texto1-1'>Para nossa última etapa, formule uma pergunta e selecione sua dificuldade (pode ser uma fácil, intermediária ou avançada) sobre o assunto do conteúdo, sendo a primeira alternativa a correta</p>
                
                <Quiz
                    videoId={match.params.id}
                    usr={match.params.usr}
                />

            </div>
        );
    }
}


export default Review2;