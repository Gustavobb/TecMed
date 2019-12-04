import React, { Component } from "react";
import '../css/Upload.css';
import axios from 'axios'
import jwr_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



class UploadVideos extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            category: '',
            creator: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        if (token != undefined) {
            const decoded = jwr_decode(token)
            this.setState({
                creator: decoded.full_name
            })
        }
    }


    handleChange = async (e) => {
        let name = e.target.name

        this.setState({
            [name]: e.target.value
        })

    }
    submit = async (e) => {
        var n = this.state.id.search("v=")
        var final_id = this.state.id.substring(n + 2)
        alert("Muito obrigado! Seu vídeo foi enviado para a Revisão!")
        await axios.post("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/startId/", {
            id: final_id,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            creator: this.state.creator
        })
        alert("Done")
    }

    render() {
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
                                <Form.Control name="id" type="link" placeholder="URL" onChange={this.handleChange} />
                                <Form.Text  className="text-muted" >
                                    Pegue o endereço do vídeo do YouTube e cole aqui.
              </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Título do vídeo" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" name="description" placeholder="Descrição" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" name="category" onChange={this.handleChange}> 
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
                            <Link to="/" >
                                <Button variant="primary" type="submit" style={{marginTop: "1rem"}} onClick={this.submit}>
                                    Adicionar
            </Button>
                            </Link>
                        </Form>

                    </div>
                </div>
            </div>

        );
    }
}

export default UploadVideos;

