import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const PerguntaReview = ({pergunta1, pergunta2, pergunta3, videoId, usr}) => {

    return(
        <div className="container">
        <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
            
            <form action={`/review2/VideoId=${videoId}&usr=${usr}`}>
                <per>{pergunta1}</per>
                <div>
                    
                    <Form.Check inline type={"checkbox"} name="resposta1" value="0"/>
                    <n>Ruim</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="1" style={{marginLeft:"1rem"}}/>
                    <n>Regular</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="2" style={{marginLeft:"1rem"}}/>
                    <n>Bom</n>
                </div>
                <br/>

                <per>{pergunta2}</per>
                <div>
                    
                    <Form.Check inline type={"checkbox"} name="resposta1" value="0" style={{marginLeft:"1rem"}}/>
                    <n>Ruim</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="1" style={{marginLeft:"1rem"}}/>
                    <n>Bom</n>
                </div>
                <br/>

                <per>{pergunta3}</per>
                <div>
                <Form.Check inline type={"checkbox"} name="resposta1" value="0"/>
                    <n>Incorretas</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="1" style={{marginLeft:"1rem"}}/>
                    <n>Regulares</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="2" style={{marginLeft:"1rem"}}/>
                    <n>Corretas</n>
                </div>
                <br/>
                <div>
                    <Button type="submit" className="button">Enviar</Button>
                </div>
            </form>          
            </div>
                </div>
            </div>
    
);
}


export default PerguntaReview;