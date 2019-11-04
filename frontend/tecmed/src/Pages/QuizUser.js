import React, { useState, useEffect } from "react";
import axios from "axios"


const QuizUser = ({match}) => {
    //console.log("oi", match.params.id)
    const [data, setData] = useState();
    //const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [creator, setCreator] = useState("");
    const [reviwer, setReviwer] = useState("");
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
                
                setListAnswer(data.quiz.answers)
                setQuestion(data.quiz.question)
                setCorrectAnswer(data.quiz.correct)
                setTitle(data.quiz.title)
                setCategory(data.quiz.category)
                setIdVideo(data.quiz.video)
                setCreator(data.quiz.creator)
                setReviwer(data.quiz.reviwer)
                // setId(match.params.id)
                // console.log(id) 
            })
            
                       

            

    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div>
            {/* Video
            Feito por
            Revisado por
            Favorito
            Compartilhar
            QUIZ */}
        
            <h1>Olá {match.params.id}</h1>
        {/* <iframe src="https://www.youtube.com/embed/"  {idVideo}  width="852" height="480">VIdeo</iframe> */}
        <iframe src="https://www.youtube.com/embed/wFAtV0bvBRo"  width="852" height="480">VIdeo</iframe>
            <h3>Feito por: </h3>
            <h3>Revisado por: ***** </h3>
        
            
            </div>
    );
}


export default QuizUser;