import React, {useEffect} from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'
import mock from "../mock.json"
import axios from 'axios';


const Review = ({match}) => {

    useEffect(()=>{
        fetchID()
    },[])

    const fetchID = async () =>{
        const response = await axios.get('http://localhost:9000/routes/getUnreviewedVideos');
        const unrevVids = await response.json();
    } 

    
    const videos = mock.filter((card) =>{
        if(card.id == match.params.id){
            return true;
        }
        return false;
    });

    const video = videos[0]

    const fakeID = 'wFAtV0bvBRo'
      
    return(
        <div className='Review'>
            <h1>Ola Revisor!</h1>
            <d><b>Video:</b>Rinite</d>
            <d>Por favor, Avalie o conteúdo conforme o formulário abaixo.</d>
            
            <iframe src={`https://www.youtube.com/embed/${fakeID}`} width="852" height="480">Video</iframe>


            <d>De 0 a 10, quanto você concorda com estas afirmações?</d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento'
                pergunta2='O autor do vídeo é uma pessoa confiável'
                pergunta3='As informações do vídeo estão corretas'
                videoId={fakeID}
                usr={match.params.usr}
            />
        </div>
    );
}


export default Review;