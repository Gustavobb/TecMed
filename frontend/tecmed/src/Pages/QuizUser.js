import React, { useState, useEffect } from "react";
import '../css/Home.css'
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

    const [textAnswer1_1, setTextAnswer1_1] = useState("");
    const [isAnswer1_1, setIsAnswer1_1] = useState(Boolean);
    const [textAnswer1_2, setTextAnswer1_2] = useState("");
    const [isAnswer1_2, setIsAnswer1_2] = useState(Boolean);
    const [textAnswer1_3, setTextAnswer1_3] = useState("");
    const [isAnswer1_3, setIsAnswer1_3] = useState(Boolean);

    const [question1, setQuestion1] = useState("");
    const [level1, setLevel1] = useState("");

    
    useEffect(() => {
        //axios.get(`http://localhost:4000/v1/users/quiz?id=${match.params.id}`){}
        fetch(`http://localhost:9000/routes/id?id=5dc9bb432a9b1729aae77f13`) //id estatico depois mudar
            .then(response => response.json())            
            .then (data => {
                setData(data)
                console.log(data)
                setQuestion1(data.videoSpecifications.quiz.question1.question)
                setLevel1(data.videoSpecifications.quiz.question1.level)

                setTitle(data.videoSpecifications.title)
                setCategory(data.videoSpecifications.category)
                setCreator(data.videoSpecifications.creator)
                setReviewer(data.videoSpecifications.reviewer)

                setTextAnswer1_1(data.videoSpecifications.quiz.question1.answers.answer1.text)
                setTextAnswer1_2(data.videoSpecifications.quiz.question1.answers.answer2.text)
                setTextAnswer1_3(data.videoSpecifications.quiz.question1.answers.answer3.text)
                console.log(setTextAnswer1_1)
                console.log(setTextAnswer1_2)
                console.log(setTextAnswer1_3)



                setIsAnswer1_1(data.videoSpecifications.quiz.question1.answers.answer1.correct)
                setIsAnswer1_2(data.videoSpecifications.quiz.question1.answers.answer2.correct)
                setIsAnswer1_3(data.videoSpecifications.quiz.question1.answers.answer3.correct)


            })

            // axios.post("http://localhost:9000/routes/add", quiz3 )
            
                
    },[])

    //depois fazer um makeShuffle da lista de alternativas

    return(
        <div className="Home">    
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>
            {/* <h1>Olá {match.params.id}</h1> */}
            <h3> {title}</h3>
        {/* <iframe src="https://www.youtube.com/embed/"  {idVideo}  width="852" height="480">VIdeo</iframe> */}
        <center><iframe src="https://www.youtube.com/embed/wFAtV0bvBRo" width="600" height="360">></iframe></center>
            <h6>Feito por: {creator} | Revisado por: {reviewer}</h6>
            <FavShare/>
            {/* <img src="./fav.png"/>  */}
            <Question question={question1} textAnswer1_1={textAnswer1_1} isAnswer1_1={isAnswer1_1} textAnswer1_2={textAnswer1_2} isAnswer1_2={isAnswer1_2} textAnswer1_3={textAnswer1_3} isAnswer1_3={isAnswer1_3}  />
            <br></br>
          
        
            
            </div>
    );
}


export default QuizUser;