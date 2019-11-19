import React, { Component } from "react";
import Dropzone from '../Components/Dropzone.js'

class UploadVideos extends Component {
    render() {
        return(
            <div>
                <h1 className="title"> Faça o seu upload de vídeo aqui! </h1><br/>
                <Dropzone/><br/>
                <form>
                    <h5><p> Coloque uma descrição para o vídeo: </p>
                    <p><input type="text" name="name"/></p><br/>
                        <p> Start time: 
                        <input type="time" step="1" min="00:00:00" max="02:00:00"/></p>
                        <p> End time: 
                        <input type="time" step="1" min="00:00:00" max="02:00:00"/></p>
                    </h5><br/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default UploadVideos;