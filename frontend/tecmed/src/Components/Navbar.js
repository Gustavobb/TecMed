import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios'

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    async awsPost() {

        const response = await axios.get('http://localhost:9000/routes/getPreSignedUrl')
        console.log(response)
        const aws = await axios.put(response.url,'~/Downloads/aaa.mp4')
        console.log(aws)
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registerDoctor" className="nav-link">
                        Register Doctor
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registerUser" className="nav-link">
                        Register User
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <Form inline>
                    <FormControl style={{width:"30rem", marginLeft:"1rem"}}type="text" placeholder="Pesquisar" className="mr-sm-2"/>
                    <Button style={{marginLeft:"-4.5rem", backgroundColor:"white", color:"black"}}variant="outline-success">Buscar</Button>
                </Form>
                <button onClick = {()=> this.awsPost()}>
                    aaa
                </button>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div style={{marginLeft:"17rem"}}className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
               
            </nav>


        )
    }
}

export default withRouter(Navbar)
