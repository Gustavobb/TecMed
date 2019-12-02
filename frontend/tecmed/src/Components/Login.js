import React, {Component} from 'react'
import {login} from './UserFunctions'
import { Link , Redirect} from 'react-router-dom'
import History from './History'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            userType: '',
            loginWrong: false,
            typeChoosen: false,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target)
        if(e.target.name === "userType"){
            this.setState({typeChoosen: true})
        }
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            full_name: this.state.full_name,
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType,
        }
        if (this.state.userType !== ''){
            this.setState({typeChoosen: true})
            login(user).then(res => {
                console.log("something wrong: " + this.state.loginWrong)
                console.log("type choosen: " + this.state.typeChoosen)
                console.log(res)
                if(res !== undefined){
                    if (this.state.userType == "user"){
                        History.push('/profileUser')
                        document.location.reload(true)
                    }else {
                        History.push('/profileDoctor')
                        document.location.reload(true)
                    }
                } else{
                    this.setState({loginWrong: true})
                }
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Login
                            </h1>
                            <div className="form-group">
                                <div>
                                    <input type="radio" name="userType" onClick={this.onChange} value="user"/> Normal  
                                    <input style={{marginLeft: '1rem'}} type="radio" name="userType" onClick={this.onChange} value="doctor"/> Profissional de Saúde  
                                    <input style={{marginLeft: '1rem'}} type="radio" name="userType" onClick={this.onChange} value="reviewer"/> Avaliador  
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" name="email" placeholder="Insira email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha:</label>
                                <input type="password" className="form-control" name="password" placeholder="Insira senha" value={this.state.password} onChange={this.onChange}/>
                            </div>
                            {this.state.typeChoosen===false &&
                            <p style={{color: '#ff0000'}}>
                                Tipo de login não escolhido! Favor escolha um tipo.
                            </p>}
                            {this.state.loginWrong===true &&
                            <p style={{color: '#ff0000'}}>
                                Email ou senha incorretos. Por favor tente novamente ou mude sua senha.
                            </p>}
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Logar
                            </button>
                        </form>
                        <Link to="/forgot" className="nav-link">
                        Esqueceu sua senha?
                        </Link>
                        <br></br>

                        <h3 className="h5 mb-3 font-weight-normal" >
                                Não tem uma conta? Se cadastre:
                                <div style={{display: "flex", justifyContent: "space-evenly", marginTop:"1rem", fontSize:"1rem"}}>
                                <Link to="/registerUser">
                                    <button style={{fontSize:"1rem"}} type="button" className="btn btn-lg btn-primary btn-block" >
                                    Conta Comum
                                    </button>
                                </Link>

                                <Link to="/registerDoctor">
                                    <button style={{fontSize:"1rem"}} type="button" className="btn btn-lg btn-primary btn-block">
                                    Profissional de Saúde
                                    </button>
                                </Link>
                                </div>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
