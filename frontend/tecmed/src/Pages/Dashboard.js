import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../css/Home.css';





const Dashboard = () =>{

    const [listContent, setListContent] = useState([])
    const [listQuiz, setListQuiz] = useState([])
    const [value, setValue] = useState(1);

    useEffect(()=>{
          getContent()

    },[])

    const handleChange = val => setValue(val);


    const getContent = (async ()=>{
            var quiz = await axios.get('http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getQuizStats')
            setListQuiz(quiz.data)
            var content = await axios.get('http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/getVideoStats')
            setListContent(content.data)

        
    })


    const displayContentItem = (listDisplay) => { 
        console.log(listDisplay)
            return(
            listDisplay.map(item => (
                <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem", backgroundColor: "#ADD6FF"}}>
                <iframe src={`https://www.youtube.com/embed/${item.videoSpecifications.id}`} />
                <Card.Body style={{color: 'black'}}>
                  <Card.Title>{item.videoSpecifications.title}</Card.Title>
                      < Card.Text style={{fontSize:'1rem'}}> 
                    {item.videoSpecifications.category} <br></br>
                    <div style={{float:"right"}}>
                    {item.videoSpecifications.clicked} visualizações
                    </div>
                  </Card.Text>
                </Card.Body>  
              </Card>
              ))
            );
      }

    const displayQuizItem = (listDisplay) =>{
        console.log("nice", listDisplay)
        return(
        listDisplay.map(item=>(
                <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem", backgroundColor: "#ADD6FF"}}>
                <iframe src={`https://www.youtube.com/embed/${item.videoSpecifications.id}`} />
                <Card.Body style={{color: 'black'}}>
                  <Card.Title>{item.quiz[0].question}</Card.Title>
                      < Card.Text style={{fontSize:'1rem'}}> 
                    Respondido: {item.quiz[0].counter} vezes <br></br>
                    Taxa de acerto: {Math.floor((item.quiz[0].correct / item.quiz[0].counter)*100,2)}%  
                  </Card.Text>
                </Card.Body>  
              </Card>            
        ))
        )
    }

    return(
        <div>
            <center><h1 className="h3 mb-3 font-weight-normal">Dashboard</h1></center>
            <ButtonToolbar style={{width:"100%", justifyContent:"center", marginTop:"2rem"}}>
                <ToggleButtonGroup style={{width: "30%"}}type="radio" name="options" defaultValue={1} onChange={handleChange}>
                <ToggleButton value={1}>Estatísticas Video </ToggleButton>
                <ToggleButton value={2}>Estatísticas Quiz</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>

            <div className="items">
            {listContent== [] || value!=1 ? null : displayContentItem(listContent)}
            {listQuiz== [] || value!=2 ? null : displayQuizItem(listQuiz)}
            </div>
        </div>
    )
}

export default Dashboard