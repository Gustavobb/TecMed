import React, {Component} from 'react'
import {forgot} from './UserFunctions'
import { Link } from 'react-router-dom'

class ForgotPsw extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            userType: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            email: this.state.email,
            userType: this.state.userType,
        }
        forgot(user).then(res => {
            if(res){
                this.props.history.push('/forgot')
            }
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-6 mt-5 mx-auto">
                    <h1 style={{ marginBottom:"2rem"}}>Esqueceu sua senha?</h1>
                        <form noValidate onSubmit={this.onSubmit}>
                            {/* <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1> */}
                            <div className="form-group">
                                <div>
                                    <h4>Selecione seu tipo de conta:</h4>
                                    <input type="radio" name="userType" onClick={this.onChange}  value="user"/> Normal  
                                    <input type="radio" name="userType" onClick={this.onChange} style={{marginLeft:"1rem"}} value="doctor"/> Doutor  
                                    <input type="radio" name="userType" onClick={this.onChange} style={{marginLeft:"1rem"}} value="reviewer"/> Avaliador  
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Send Email!
                            </button>
                        </form>
                        <Link to="/login" className="nav-link">
                        Go back!
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPsw
