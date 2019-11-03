import React from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'
import mock from "../mock.json"


const Review = ({match}) => {

    const videos = mock.filter((card) =>{
        if(card.id == match.params.id){
            return true;
        }
        return false;
    });

    const video = videos[0]
      
    return(
        <div className='Review'>
            <h1>Ola {match.params.usr}!</h1>
            <d><b>Video:</b>{video.titulo}</d>
            <d>Por favor, Avalie o conteúdo conforme o formulário abaixo.</d>
            
            <iframe src={`https://www.youtube.com/embed/${video.id}`} width="852" height="480">Video</iframe>


            <d>De 0 a 10, quanto você concorda com estas afirmações?</d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento'
                pergunta2='O autor do vídeo é uma pessoa confiável'
                pergunta3='As informações do vídeo estão corretas'
                videoId={video.id}
            />
        </div>
    );
}


export default Review;