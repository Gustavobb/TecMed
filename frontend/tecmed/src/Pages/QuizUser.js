import React, { useState, useEffect } from "react";
import '../css/QuizUser.css'
import Question from '../Components/Question.js'
import FavShare from '../Components/FavShare.js'
import jwr_decode from 'jwt-decode'


const QuizUser = ({match}) => {
    //console.log("oi", match.params.id)
    const [data, setData] = useState();
    const [id, setId] = useState("");
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
    const [listAlternatives, setlistAlternatives] = useState([]);  

    useEffect(() => {
        fetch(`http://localhost:9000/routes/getContentById?id=${match.params.id}`) 
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

                setDifficulty(data.quiz[i].difficulty)
                setQuestion(data.quiz[i].question)
                setCorrect(data.quiz[i].alternatives[0]) //alternatives[0] é a resposta correta
                
                let lista = []
                data.quiz[i].alternatives.map(
                    alternatives=>{lista.push(alternatives)})
               
                makeShuffle(lista)
                setlistAlternatives(lista)


                //const token = localStorage.usertoken
                //const decoded = jwr_decode(token)
                //setId(decoded._id)


            
            })            
    },[])

    const makeShuffle = (lista) => {
        for (var i = lista.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = lista[i];
            lista[i] = lista[j];
            lista[j] = temp;
        }
    }


    return(
        <div className="Home">    
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
            {/* <h1>Olá {match.params.id}</h1> */}
            {/* <h3> {title}</h3> */}
        <center><iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" width="600" height="360">></iframe></center>
            <h6>Feito por: {creator} | Revisado por: {reviewer}</h6>
            <FavShare/>

            <Question question={question} correct={correct} alternatives={listAlternatives} difficulty={difficulty} id={3678976}/>        
            
        </div>
    );
}


export default QuizUser;