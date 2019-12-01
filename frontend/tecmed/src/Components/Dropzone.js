import React, { Component } from 'react'
import axios from 'axios'
import '../css/Dropzone.css';

const acceptedFileTypes = 'video/mp4'

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

  verifyFile(files) {
    const currentFile = files[0]
    const currentFileType = currentFile.type
    if (!acceptedFileTypes.includes(currentFileType)){
      alert("Tipo de arquivo não suportado.")
      return false
    } return true
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

  handleOnDrop(files) {
    const isVerified = this.verifyFile(files)
    if(isVerified){
      const currentFile = files[0]
      const reader = new FileReader()
      reader.addEventListener("load", ()=>{
        console.log(reader.result)
        this.setState({
          file:reader.result
        })
      }, false)

      reader.readAsDataURL(currentFile)
    }
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
    const {file} = this.state
    return (
      <form className="Drop" onSubmit={this.submitFile}>
        <div className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}  
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.handleOnDrop}
          onClick={this.openFileDialog}
          onChange={this.onFilesAdded}
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
          <span className="text">Upload Files</span>
          {file !== null ? 
            <div>
              {file}
              <img src={file} />
            </div> : ''
          }
        </div>
      </form>
    );
  }
}

export default Dropzone