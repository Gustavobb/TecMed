import React from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'

const Review = ({match}) => {
    let urlvid = "_BJXKcwekBA"
    return(
        <div className='Review'>
            <h1>Ola {match.params.usr}</h1>
            <h1>Video: {match.params.id}</h1>
            <d>Por favor, Avalie o conteúdo conforme o formulário abaixo. Em seguida, Formule um quiz sobre o assunto:</d>
            
            <iframe src="https://www.youtube.com/embed/_BJXKcwekBA" width="852" height="480">Video</iframe>


            <d>De 0 a 10, quanto você concorda com estas afirmações?</d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento'
                pergunta2='O autor do vídeo é uma pessoa confiável'
                pergunta3='As informações do vídeo estão corretas'
                videoId={urlvid}
            />

            <h2>Quiz</h2>
        </div>
    );
}


export default Review;