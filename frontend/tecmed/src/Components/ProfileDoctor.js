import React, {Component} from 'react'
import jwr_decode from 'jwt-decode'

class ProfileDoctor extends Component {
    constructor(){
        super()
        this.state = {
            full_name: '',
            email: '',
            cpf: '',
            council: '',
            council_state: '',
            council_number: '',
            graduation_degree: '',
            certificate: '',
        }
    }
    
    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwr_decode(token)
        this.setState({
            full_name: decoded.full_name,
            cpf: decoded.cpf,
            email: decoded.email,
            council: decoded.council,
            council_state: decoded.council_state,
            council_number: decoded.council_number,
            graduation_degree: decoded.graduation_degree,
            certificate: decoded.certificate,
        })
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{this.state.full_name}</td>
                            </tr>
                            <tr>
                                <td>CPF</td>
                                <td>{this.state.cpf}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Council</td>
                                <td>{this.state.council}</td>
                            </tr>
                            <tr>
                                <td>Council state</td>
                                <td>{this.state.council_state}</td>
                            </tr>
                            <tr>
                                <td>Council number</td>
                                <td>{this.state.council_number}</td>
                            </tr>
                            <tr>
                                <td>Graduation degree</td>
                                <td>{this.state.graduation_degree}</td>
                            </tr>
                            <tr>
                                <td>certificate</td>
                                <td>{this.state.certificate}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

export default ProfileDoctor