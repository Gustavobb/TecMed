import React, {Component} from 'react'
import jwr_decode from 'jwt-decode'

// nao esta atualizando do back
// entao nao atualiza o score

class ProfileUser extends Component {
    constructor(){
        super()
        this.state = {
            full_name: '',
            email: '',
            cpf: '',
            birth_date: '',
            scholarity: '',
            score: '',
            
        }
    }
    
    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwr_decode(token)
        this.setState({
            full_name: decoded.full_name,
            cpf: decoded.cpf,
            email: decoded.email,
            birth_date: decoded.birth_date,
            scholarity: decoded.scholarity,
            score: decoded.score,
        })
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Perfil</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Nome completo:</td>
                                <td>{this.state.full_name}</td>
                            </tr>
                            <tr>
                                <td>CPF:</td>
                                <td>{this.state.cpf}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Data de nascimento:</td>
                                <td>{this.state.birth_date}</td>
                            </tr>
                            <tr>
                                <td>Escolaridade:</td>
                                <td>{this.state.scholarity}</td>
                            </tr>
                            <tr>
                                <td>Score:</td>
                                <td>{this.state.score}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

export default ProfileUser