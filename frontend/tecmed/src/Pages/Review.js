import React, {useEffect, useState} from 'react';
import PerguntaReview from '../Components/PerguntaReview.js'
import axios from 'axios';
import jwr_decode from 'jwt-decode'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';

const Review = ({match}) => {

    const [videoID, setVideoID] = useState({})
    const [fullName,setFullName] = useState('')

    useEffect(()=>{
        const token = localStorage.usertoken
        if (token != undefined){
            const decoded = jwr_decode(token)
            setFullName(decoded.full_name)

            console.log(decoded)                        
        }
        
        fetchVideoID()
    },[])

    const fetchVideoID = async() =>{
        console.log(match.params.id)
        const vid = await axios.get(`http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getContentById?id=${match.params.id}`).then(({data})=>{
            return data
        });
        setVideoID(vid.videoSpecifications.id)
        console.log(vid.videoSpecifications.id)
    }
    
    return(
        <div style={{backgroundColor:"#AAABE6"}}>
        <center>
        <Card style={{ width: '59rem'}}>

        <div className='Review' style={{marginTop:"2rem", marginBottom:"2rem"}}>
            <h2>Olá {fullName}! Por favor avalie o video: </h2>
                            
    
            <center>
            <iframe src={`https://www.youtube.com/embed/${videoID}`} width="700" height="480">Video</iframe>
            </center>
            <d></d>
            <PerguntaReview
                pergunta1='O vídeo passa uma mensagem clara e de fácil entendimento?'
                pergunta2='O autor do vídeo é uma pessoa confiável?'
                pergunta3='As informações do vídeo estão corretas?'
                videoId={match.params.id}
               
            />
        </div>
        </Card>
        </center>  
        </div> 
    );
}


export default Review;