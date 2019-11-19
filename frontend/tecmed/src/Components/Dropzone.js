import React, { Component } from 'react'
import axios from 'axios'
import '../css/Dropzone.css';

class Dropzone extends Component {

  constructor(props) {
    super(props);
    this.state = { file:null };
  }

  async awsPost(file) {

    var options = {
        headers: {
            'Content-Type': file[0].type
        }
    };

    try {
        const response = await axios.get('http://localhost:9000/routes/getPreSignedUrl')
        console.log(response.data.url)
        const data = await axios.put(response.data.url, file[0], options).then((data) => {
            return data
        })

        if (data.statusText == "OK") {
            await axios.post('http://localhost:9000/routes/awsVideoPost/' + response.data.id)
        }

        console.log(data)

    } catch (e) {
        console.error(e)
    }
}

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' id='file' onChange={(e) => this.awsPost(e.target.files)} />
      </form>
    );
  }
}

export default Dropzone