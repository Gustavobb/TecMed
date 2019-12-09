import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../css/Home.css';


const Ranking = () =>{

    const [listContent, setListContent] = useState([])

    useEffect(()=>{
          getContent()

    },[])

    const getContent = (async ()=>{
            var content = await axios.get('http://localhost/routes/getRanking')
            setListContent(content.data)
 
              
    })

    return(
        <div className="container">
           <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Ranking</h1>
                    </div>
            
            <table className="table col-md-6 mx-auto">
            <tr>
                <th><p>User</p></th>
                <th><p>Score</p></th>
            </tr>
            <tr>
            <th>
                {listContent.map((itens) => (
                <p>{itens.full_name}</p>
                ))}
             </th>

            <th>
            {listContent.map((itens) => (
                <p>{itens.score}</p>
                ))}
            </th>
            </tr>
        </table>

         </div>   

        </div>
    )
}

export default Ranking