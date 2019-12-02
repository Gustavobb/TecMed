import React, { Component } from "react";
import '../css/Upload.css';
import axios from 'axios'


class UploadVideos extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            description: ''
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
        var final_id =  e.target.id.search(n+2)
        
        await axios.post("http://localhost:9000/routes/startId",{
            id: final_id,
            description: e.target.description
        })
        
    }

    render() {
        return(
            <div className="upload">
                <h1 className="title"> Faça o upload do seu vídeo aqui! </h1><br/>
                <form>

                    <p><input type="text" name="id" placeholder="URL YouTube" onChange={this.handleChange}></input></p>
                    <h5><p> Coloque uma descrição para o vídeo: </p></h5>
                    <p><input type="text" name="description"onChange={this.handleChange}/></p><br/>
                    <input    type="submit" onClick={this.submit}/>
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