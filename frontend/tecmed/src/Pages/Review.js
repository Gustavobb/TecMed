import React, {useEffect, useState} from 'react';
import '../css/Review.css'
import PerguntaReview from '../Components/PerguntaReview.js'
import mock from "../mock.json"
import axios from 'axios';


const Review = ({match}) => {

    useEffect(()=>{
        fetchUnrev()
    },[])

    const [vid, setVIDS] = useState({});
    const [id, setID] = useState('');

    const fetchUnrev = async () =>{
        const unrevVids = await axios.get('http://localhost:9000/routes/getUnreviewedVideos').then(({data})=>{
            return data
        });
        setVIDS(unrevVids);
        setID(unrevVids[0]._id)
        console.log(unrevVids)
        console.log(unrevVids[0]._id)
            
    } 
    
    const fakeID = 'wFAtV0bvBRo'

    return(
        <div className='Review'>
            <h1>Ola Revisor!</h1>
            <d><b>Video:</b>oi</d>
            <d>Por favor, Avalie o conteúdo conforme o formulário abaixo.</d>
            
            <iframe src={`https://www.youtube.com/embed/${fakeID}`} width="852" height="480">Video</iframe>


            <d>De 0 a 10, quanto você concorda com estas afirmações?</d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento'
                pergunta2='O autor do vídeo é uma pessoa confiável'
                pergunta3='As informações do vídeo estão corretas'
                videoId={id}
                usr={match.params.usr}
            />
        </div>
    );
}


export default Review;