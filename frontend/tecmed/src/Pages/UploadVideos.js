import React, { Component } from "react";
import '../css/Upload.css';
import Dropzone from '../Components/Dropzone.js'

class UploadVideos extends Component {

    render() {
        return(
            <div className="upload">
                <h1 className="title"> Faça o upload do seu vídeo aqui! </h1><br/>
                <Dropzone/><br/>
                <form>
                    <h5><p> Coloque uma descrição para o vídeo: </p>
                    <p><input type="text" name="name"/></p><br/>
                        <p> Start time: 
                        <input type="time" step="1" min="00:00:00" max="01:59:59"/></p>
                        <p> End time: 
                        <input type="time" step="1" min="00:00:01" max="02:00:00"/></p>
                    </h5><br/>
                    <button className="submit" onClick={Dropzone.onFilesAdded}>Enviar</button>
                </form>
            </div>
        );
    }
}

export default UploadVideos;