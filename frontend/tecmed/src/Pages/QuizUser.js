import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'
import Question from '../Components/Question.js'
import FavShare from '../Components/FavShare.js'


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
                setTitle(data.videoSpecifications.title)
                setCategory(data.videoSpecifications.category)
                setCreator(data.videoSpecifications.creator)
                setReviewer(data.videoSpecifications.reviewer)
                setQuiz(data.quiz)

                //por enquanto está pegando a questao aleatoriamente
                //depois mostrar facil na primeira vez
                const max = data.quiz.length //o maximo deve ser quantos quiz tem
                const i = Math.floor(Math.random() * Math.floor(max));
                setAlternatives(data.quiz[i].alternatives)
                setDifficulty(data.quiz[i].difficulty)
                setQuestion(data.quiz[i].question)
                setCorrect(data.quiz[i].alternatives[0]) //alternatives[0] é a resposta correta
            })            
                
    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div className="Home">    
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
            {/* <h1>Olá {match.params.id}</h1> */}
            {/* <h3> {title}</h3> */}
        <center><iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" width="600" height="360">></iframe></center>
            <h6>Feito por: {creator} | Revisado por: {reviewer}</h6>
            <FavShare/>

            <Question question={question} correct={correct} alternatives={alternatives} difficulty={difficulty}/>        
            
        </div>
    );
}


export default QuizUser;