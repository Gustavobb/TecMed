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
            full_name: this.state.full_name,
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType,
        }
        login(user).then(res => {
            console.log(res)
            if(res !== undefined){
                console.log("AA")
                if (this.state.userType == "user"){
                    console.log("BB")
                    History.push('/profileUser')
                    document.location.reload(true)
                }else {
                    console.log("CC")
                    History.push('/profileDoctor')
                    document.location.reload(true)
                }
            }
        })

    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <div className="form-group">
                                <div>
                                    <input type="radio" name="userType" onClick={this.onChange} value="user"/> Normal  
                                    <input type="radio" name="userType" onClick={this.onChange} value="doctor"/> Doutor  
                                    <input type="radio" name="userType" onClick={this.onChange} value="reviewer"/> Avaliador  
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                        </form>
                        <Link to="/forgot" className="nav-link">
                        Forgot password?
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
