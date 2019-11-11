import React, { useState, useEffect } from "react";
import '../css/Home.css'
import Question from '../Components/Question.js'
import Header from '../Components/Header.js'
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
    var quiz3 = {
        videoSpecifications:{
            title: "Maconha | JAIRO RESPONDE",
            category: "Maconha",
            video: "EEb2Uz5tNy0",
            creator: "Raquel Moyses",
            reviewer: "Reviewer 1"},
        quiz: [{
            difficulty: "Fácil",
            question: "É verdade que maconha não vicia?",
            answers: ["Sim, pois maconha é uma erva natural e por ser natural não vicia.", "Não, maconha vicia sim, porém não causa problemas de saúde ou sociais.", "Não, maconhapode gerar dependência para quem usa, com impacto negativo sobre a sua vida."],
            correct: "Não, maconhapode gerar dependência para quem usa, com impacto negativo sobre a sua vida"
        },{
            difficulty: "Médio",
            question: "Maconha atrapalha o sexo?",
            answers: ["Sim, pois diminui a lubrificação das mulheres.", "Não, pois relaxa e facilita o orgasmo.", "Sim, pois faz o homem ejacular mais rápido."],
            correct: "Sim, pois diminui a lubrificação das mulheres."
        }]
    }
    
    
    useEffect(() => {
        //axios.get(`http://localhost:4000/v1/users/quiz?id=${match.params.id}`){}
        fetch(`http://localhost:9000/routes/quiz?id=${match.params.id}`)
            .then(response => response.json())            
            .then (data => {
                setData(data)
                setListAnswer(data.quiz.answers)
                setQuestion(data.quiz.question)
                setCorrectAnswer(data.quiz.correct)
                setTitle(data.title)
                setCategory(data.category)
                setIdVideo(data.video)
                setCreator(data.creator)
                setReviewer(data.reviewer)

                // setId(match.params.id)
                // console.log(id) 
            })

            axios.post("http://localhost:9000/routes/add", quiz3 )
            
                
    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div className="Home">    
            <Header/>

            {/* <h1>Olá {match.params.id}</h1> */}
            <h3> {title}</h3>
        {/* <iframe src="https://www.youtube.com/embed/"  {idVideo}  width="852" height="480">VIdeo</iframe> */}
        <center><iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" width="600" height="360">></iframe></center>
            <h6>Feito por: {creator} | Revisado por: {reviewer}</h6>
            {/* <img src="./fav.png"/>  */}
            <Question question={question} listAnswer={listAnswer} correctAnswer={correctAnswer} />
            <br></br>
          
        
            
            </div>
    );
}


export default QuizUser;