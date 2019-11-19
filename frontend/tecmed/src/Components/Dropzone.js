import React, { Component } from 'react'
import axios from 'axios'
import '../css/Dropzone.css';

class Dropzone extends Component {

  constructor(props) {
    super(props)
    this.state = { file:null }

    this.fileInputRef = React.createRef()
    this.openFileDialog = this.openFileDialog.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
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

  openFileDialog() {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }

  onFilesAdded(e) {
    if (this.props.disabled) return
    const files = e.target.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
      console.log("adicionado")
    }
  }

  onDragOver(e) {
    e.preventDefault()

    if (this.props.disabled) return

    this.setState({ hightlight: true })
  }

  onDragLeave() {
    this.setState({ hightlight: false })
  }

  onDrop(e) {
    e.preventDefault()

    if (this.props.disabled) return

    const files = e.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray(list) {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit(e) {
    e.preventDefault()
    const data = {
      file: this.state.file[0]
    }
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <div className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}  
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
          style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
        >
          <input 
            ref={this.fileInputRef}
            className='FileInput'
            label='upload file'
            type='file'
            id='file'
            onChange={this.onFilesAdded}
          />
          <img alt="upload" className="Icon" src="upload.png"/>
          <span>Upload Files</span>
        </div>
      </form>
    );
  }
}

export default Dropzone