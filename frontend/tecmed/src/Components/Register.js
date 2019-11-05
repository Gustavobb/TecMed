import React, {Component} from 'react'
import {register} from './UserFunctions'
import Popup from './Popup'

class Register extends Component{
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            registered: false,
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }

        if(user.first_name !== "" || user.last_name !== "" || user.email!== "" || user.password !== ""){
            register(user).then(res => {
                this.props.history.push('/login')
            })
            this.setState(this.registered, true)
        } else {
            console.log("algum campo está vazio")
        }
    }
        render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please register
                            </h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" className="form-control" name="first_name" placeholder="Enter First Name" value={this.state.first_name} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" className="form-control" name="last_name" placeholder="Enter Last Name" value={this.state.last_name} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <Popup text={this.registered ? "Registrado!": "Algum campo está incompleto"}/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
