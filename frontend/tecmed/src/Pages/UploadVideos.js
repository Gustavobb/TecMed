import React, {useEffect, useState} from 'react';
import '../css/Upload.css';
import axios from 'axios'
import jwr_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import History from '../Components/History'




const UploadVideos= ({props}) =>{

    const [creator, setCreator] = useState('') 
            

    useEffect(() =>{
        const token = localStorage.usertoken
        if (token != undefined) {
            const decoded = jwr_decode(token)
            setCreator(decoded.full_name)
            }
    },[])
    const postVideo = async (idd, title, description, category,  creator)=>{
        await axios.post("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/startId/", {
            id: idd,
            title: title,
            description: description,
            category: category,
            creator: creator
        })
    }


    const submit = async   (e) => {
        e.preventDefault()
        var id = document.getElementById("id").value

        var description = document.getElementById("description").value
        var title = document.getElementById("title").value
        var category = document.getElementById("category").value
        document.getElementById("id").value = ''
        document.getElementById("description").value = ''
        document.getElementById("title").value = ''
        document.getElementById("category").value='Dermatologia'
        
        var n = id.search("v=")
        
        var final_id = id.substring(n + 2)
        alert("Muito obrigado! Seu vídeo foi enviado para a Revisão!")
        await postVideo(final_id,title,description,category,creator)
        
    }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal">
                                Video Upload
                            </h1>
                        <Form>
                            <Form.Group>
                                <Form.Label>Endereço do Vídeo</Form.Label>
                                <Form.Control id="id" type="link" placeholder="URL" />
                                <Form.Text  className="text-muted" >
                                    Pegue o endereço do vídeo do YouTube e cole aqui.
              </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" id="title" placeholder="Título do vídeo" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text"  id="description" placeholder="Descrição"  />
                            </Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" id="category"> 
                            <option value="Dermatologia">Dermatologia</option>
                            <option value="Cardiologia">Cardiologia</option>
                            <option value="Oncologia">Oncologia</option>
                            <option value="Pneumologia">Pneumologia</option>
                            <option value="Neurologia">Neurologia</option>
                            <option value="Psicologia">Psicologia</option>
                            <option value="Fisioterapia">Fisioterapia</option>
                            <option value="Clínica Geral">Clínica Geral</option>
                            <option value="Cirurgia Plástica">Cirurgia Plástica</option>
                            <option value="Outro">Outro</option>
                        </Form.Control>
                                <Button variant="primary" type="submit" style={{marginTop: "1rem"}} onClick={submit}>
                                    Adicionar
            </Button>
                        </Form>

                    </div>
                </div>
            </div>

        )
    
}

export default UploadVideos;

