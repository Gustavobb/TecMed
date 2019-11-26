import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import jwr_decode from 'jwt-decode'
import { decode } from 'punycode'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            score : ""
        }
    }

    componentDidMount = () => {
        
        const token = localStorage.usertoken

        if (token != undefined){ 
            const decoded = jwr_decode(token)
            this.setState({
                score : decoded.score
        })
        }
    }
   



    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
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
                        Cadastro profissional saúde
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registerUser" className="nav-link">
                        Cadastro usuário
                    </Link>
                </li>
            </ul>
        )
        var userLink
        if(localStorage.getItem("usertype") === "user"){
            userLink = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/profileUser" className="nav-link">
                            Perfil
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Logout
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  >
                            XXX Pontos
                        </a>
                    </li>

                    
                    {/* <li className="nav-item">
                        <Link to="/review/VideoId=:id&usr=:usr" className="nav-link">
                            Review
                        </Link>
                    </li> */}
    
                </ul>
            )
        }else if(localStorage.getItem("usertype") === "doctor"){
            userLink = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/profileDoctor" className="nav-link">
                            Perfil
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Logout
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/review/VideoId=:id&usr=:usr" className="nav-link">
                            Review
                        </Link>
                    </li> */}
                </ul>
            )
        }else if(localStorage.getItem("usertype") === "reviewer"){
            userLink = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/profileDoctor" className="nav-link">
                            Perfil
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/review/VideoId=:id&usr=:usr" className="nav-link">
                            Revisar
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Logout
                        </a>
                    </li>
                    
    
                </ul>
            )
        }


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <Form inline>
                    <FormControl style={{width:"30rem", marginLeft:"1rem"}}type="text" placeholder="Pesquisar" className="mr-sm-2"/>
                    <Button style={{marginLeft:"-4.5rem", backgroundColor:"white", color:"black"}}variant="outline-success">Buscar</Button>
                </Form>
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
                    {userLink ? null : loginRegLink}
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
               
            </nav>


        )
    }
}

export default withRouter(Navbar)
