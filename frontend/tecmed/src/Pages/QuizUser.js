import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'
import Question from '../Components/Question.js'
import FavShare from '../Components/FavShare.js'

import axios from "axios"


const QuizUser = ({match}) => {
    //console.log("oi", match.params.id)
    const [data, setData] = useState();
    //const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [creator, setCreator] = useState("");
    const [reviewer, setReviewer] = useState("");
    // const [idVideo, setIdVideo] = useState("");
    const [quiz, setQuiz] = useState([])
    const [alternatives, setAlternatives] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [question, setQuestion] = useState("");
    const [correct, setCorrect] = useState("");


    
    useEffect(() => {

        //axios.get(`http://localhost:4000/v1/users/quiz?id=${match.params.id}`){}
        fetch(`http://localhost:9000/routes/getContentById?id=${match.params.id}`) //id estatico depois mudar
            .then(response => response.json())            
            .then (data => {
                setData(data)
                console.log(data)
                console.log(data.videoSpecifications)
                setTitle(data.videoSpecifications.title)
                setCategory(data.videoSpecifications.category)
                setCreator(data.videoSpecifications.creator)
                setReviewer(data.videoSpecifications.reviewer)
                setQuiz(data.quiz)
                
                //por enquanto está pegando somente a primeira quesao. mudar para aleatorio depois
                //e depois mostrar facil na primeira vez
                console.log(data.quiz[0].alternatives)
                setAlternatives(data.quiz[0].alternatives)
                setDifficulty(data.quiz[0].difficulty)
                setQuestion(data.quiz[0].question)
                setCorrect(data.quiz[0].alternatives[0]) //alternatives[0] é a resposta
                
            })

            // axios.post("http://localhost:9000/routes/add", quiz3 )
            
                
    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div className="Home">    
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
            {/* <h1>Olá {match.params.id}</h1> */}
            {/* <h3> {title}</h3> */}
        {/* <iframe src="https://www.youtube.com/embed/"  {idVideo}  width="852" height="480">VIdeo</iframe> */}
        <center><iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" width="600" height="360">></iframe></center>
            <h6>Feito por: {creator} | Revisado por: {reviewer}</h6>
            <FavShare/>

            <Question question={question} correct={correct} alternatives={alternatives}/>
            

            {/* <Question question={question1} textAnswer1_1={textAnswer1_1} isAnswer1_1={isAnswer1_1} textAnswer1_2={textAnswer1_2} isAnswer1_2={isAnswer1_2} textAnswer1_3={textAnswer1_3} isAnswer1_3={isAnswer1_3}  />
            <br></br> */}
          
        
            
        </div>
    );
}


export default QuizUser;