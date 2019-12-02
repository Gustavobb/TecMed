import React, { Component } from "react";
import '../css/Upload.css';
import axios from 'axios'
import jwr_decode from 'jwt-decode'



class UploadVideos extends Component {


    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            category: '',
            creator: ''
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken
            if (token != undefined){
                const decoded = jwr_decode(token)
                this.setState({
                    creator: decoded.full_name
                })
                }

        
    }

    
    handleChange = async (e) =>{
        let name = e.target.name

        this.setState({
            [name]: e.target.value
        })

    }
    submit = async  (e) =>{
        var n = this.state.id.search("v=")
        var final_id =  this.state.id.substring(n+2)
        alert("Muito obrigado! Seu vídeo foi enviado para a Revisão!")
        await axios.post("http://ec2-54-165-32-50.compute-1.amazonaws.com/routes/startId",{
            id: final_id,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            creator: this.state.creator
        })        
    }

    render() {
        return(
            <div className="upload">
                <h1 className="title"> Faça o upload do seu vídeo aqui! </h1><br/>
                <form>
                    <p><input type="text" name="id" placeholder="URL YouTube" onChange={this.handleChange}></input></p>
                    <h5><p> Coloque um título para o vídeo: </p></h5>
                    <p><input type="text" name="title" placeholder="Título do vídeo" onChange={this.handleChange}></input></p>
                    <h5><p> Coloque uma descrição para o vídeo: </p></h5>
                    <p><input type="text" name="description"  placeholder="Descrição" onChange={this.handleChange}/></p><br/>
                    Escolha o tema do vídeo a seguir:<br/>

                    <select name="category" onChange={this.handleChange}>
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
                    </select><br/><br/>
                    <input type="submit" onClick={this.submit}/>
                </form>
            </div>
        );
    }
}

export default UploadVideos;


{/* <p> Start time:
                        <input type="time" step="1" min="00:00:00" max="01:59:59"/></p>
                        <p> End time:
                        <input type="time" step="1" min="00:00:01" max="02:00:00"/></p>
                    </h5><br/> */}