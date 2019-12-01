import React, {Component} from 'react'
import {reset} from './UserFunctions'
import { Link } from 'react-router-dom'

class ForgotPsw extends Component{
    constructor(){
        super()
        const url = window.location.href
        const urlSplit = url.split("/")
        const userType = urlSplit[4] 
        const token = urlSplit[5]

        this.state = {
            email: '',
            userType: userType,
            token: token,
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
            password: this.state.password,
            userType: this.state.userType,
            token: this.state.token
        }
        reset(user).then(res => {
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
                        <form noValidate onSubmit={this.onSubmit}>
                            {/* <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1> */}
                            <div className="form-group">
                                <label htmlFor="password">New password</label>
                                <input type="password" className="form-control" name="password" placeholder="New Password" value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Go!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPsw
