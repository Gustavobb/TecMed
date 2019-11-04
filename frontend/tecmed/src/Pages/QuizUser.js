import React, { useState, useEffect } from "react";
import '../css/Home.css'
import axios from "axios"


const QuizUser = ({match}) => {
    //console.log("oi", match.params.id)
    const [data, setData] = useState();
    //const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [creator, setCreator] = useState("");
    const [reviewer, setReviewer] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [listAnswer, setListAnswer] = useState([]);
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [idVideo, setIdVideo] = useState("");
    
    useEffect(() => {
        //axios.get(`http://localhost:4000/v1/users/quiz?id=${match.params.id}`){}
        fetch(`http://localhost:4000/v1/users/quiz?id=${match.params.id}`)
            .then(response => response.json())            
            .then (data => {
                setData(data)

                console.log(data)
                //console.log(data.quiz.correct)
                console.log(data.quiz.answers) 
                console.log(data.quiz.question)
                console.log(data.quiz.correct)
                console.log(data.title) //
                console.log(data.category)
                console.log(data.video)
                console.log(data.creator)
                console.log(data.reviewer)
                
                setListAnswer(data.quiz.answers)
                setQuestion(data.quiz.question)
                setCorrectAnswer(data.quiz.correct)
                setTitle(data.title)
                setCategory(data.category)
                setIdVideo(data.video)
                setCreator(data.creator)
                setReviewer(data.reviewer)

                console.log(creator)
                console.log(setCreator)

                // setId(match.params.id)
                // console.log(id) 
            })
            
                
    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div className="Home"> 
            {/* Video
            Feito por
            Revisado por
            Favorito
            Compartilhar
            QUIZ */}
        
            <h1>Olá {match.params.id}</h1>
            <h2> {title}</h2>
        {/* <iframe src="https://www.youtube.com/embed/"  {idVideo}  width="852" height="480">VIdeo</iframe> */}
        <iframe src="https://www.youtube.com/embed/wFAtV0bvBRo"  width="852" height="480">VIdeo</iframe>
            <h3>Feito por: {creator}</h3>
            <h3>Revisado por: {reviewer} </h3>
          
        
            
            </div>
    );
}


export default QuizUser;