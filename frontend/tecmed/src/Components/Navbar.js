import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import jwr_decode from 'jwt-decode'
import { getScore } from './UserFunctions'



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
            getScore(decoded.email).then(score => {
                this.setState({
                    score : score
                })
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
                <li className="nav-item" style={{}}>
                    <Link to="/login" className="nav-link">
                        Entrar
                    </Link>
                </li> 
            </ul>
        )
        var userLink
        if(localStorage.getItem("usertype") === "user"){
            userLink = (
                <ul className="navbar-nav" style={{float: "right"}}>
                    <li className="nav-item">
                        <Link to="/profileUser" className="nav-link">
                            Perfil
                        </Link>
                    </li>
                
                    <li className="nav-item">
                        <a className="nav-link" style={{color:"white"}}  >
                            {this.state.score} Pontos
                        </a>
                    </li>

                    <li className="nav-item" style={{ }}>
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Sair
                        </a>
                    </li>
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
                        <Link to="/uploadVideos" className="nav-link">
                            Adicionar conteúdo
                        </Link>
                    </li>

                    <li className="nav-item" style={{}}>
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Sair
                        </a>
                    </li>
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
                        <Link to="/unrevVids" className="nav-link">
                            Revisar
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                            Sair
                        </a>
                    </li>
                    
    
                </ul>
            )
        }


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                  <ul className="navbar-nav">
                        <li className="nav-item">
                        

                            <Link to="/" className="nav-link">
                                <img style={{width:"2rem"}} src={window.location.origin + "/icon_estetoscopio.png"} />
                            </Link>
                        </li>
                    </ul>

                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div style={{}}className="collapse navbar-collapse" id="navbar1">
                  
                    {userLink ? null : loginRegLink}
                    {localStorage.usertoken ? userLink : null}
                </div>
               
            </nav>
            


        )
    }
}

export default withRouter(Navbar)
