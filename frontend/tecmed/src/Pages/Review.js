import React, {useEffect, useState} from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'
import mock from "../mock.json"
import axios from 'axios';


const Review = ({match}) => {

    const [videoID, setVideoID] = useState({})

    useEffect(()=>{
        fetchVideoID()
    },[])

    const fetchVideoID = async() =>{
        console.log(match.params.id)
        const vid = await axios.get(`http://localhost:9000/routes/getContentById?id=${match.params.id}`).then(({data})=>{
            return data
        });
        setVideoID(vid.videoSpecifications.id)
        console.log(vid.videoSpecifications.id)
    }
    
    return(
        <div className='Review'>
            <h1>Ola {match.params.usr}!</h1>
            <d><b>Video:</b>oi</d>
            <d>Por favor, Avalie o conteúdo conforme o formulário abaixo.</d>
            
            <iframe src={`https://www.youtube.com/embed/${videoID}`} width="852" height="480">Video</iframe>

            <d>De 0 a 10, quanto você concorda com estas afirmações?</d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento'
                pergunta2='O autor do vídeo é uma pessoa confiável'
                pergunta3='As informações do vídeo estão corretas'
                videoId={match.params.id}
                usr={match.params.usr}
            />
        </div>
    );
}


export default Review;