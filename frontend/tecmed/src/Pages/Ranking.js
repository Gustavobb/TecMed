import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../css/Home.css';


const Ranking = () =>{

    const [listContent, setListContent] = useState([])

    useEffect(()=>{
          getContent()

    },[])

    const getContent = (async ()=>{
            var content = await axios.get('http://localhost/routes/getRanking')
            // setUser() 
            // setPoints()
            setListContent(content.data)
              
    })


    const displayContentItem = (listDisplay) => { 
            return(
            listDisplay .map(item => (
                <Card style={{ width: '20rem', marginBottom:'4rem ',marginLeft:"3rem", backgroundColor: "#ADD6FF"}}>
                    {item.full_name}<br></br>
                    {item.score}
                    <p>teste</p>
                </Card>
              ))
            );
      }

    return(
        <div>
            <center><h1 className="h3 mb-3 font-weight-normal">Ranking</h1></center>

            <div className="items">
            {listContent ==[] ?  null : displayContentItem(listContent)}
            </div> 

        </div>
    )
}

export default Ranking