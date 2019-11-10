import React, {Component} from 'react'
import {registerUser} from './UserFunctions'
import Popup from './Popup'
import History from './History'

class RegisterUser extends Component{
    constructor(){
        super()
        this.state = {
            full_name: '',
            cpf: '',
            email: '',
            birth_date: '',
            scholarity: '',
            password: '',
            registered: false,
            scholarities: [{"c": "Nenhuma"}, {"c": "Educação infantil incompleta"}, {"c": "Educação infantil completa"}, {"c": "Ensino fundamental incompleta"}, {"c": "Ensino fundamental completa"}, {"c": "Ensino médio incompleto"}, {"c": "Ensino médio completo"}, {"c": "Ensino superior incompleto"}, {"c": "Ensino superior completo"}, {"c": "Pós-graduação incompleta"}, {"c": "Pós-graduação completa"}, {"c": "Mestrado incompleto"}, {"c": "Mestrado completo"}, {"c": "Doutorado incompleto"}, {"c": "Doutorado completo"}],
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
            cpf: this.state.cpf,
            birth_date: this.state.birth_date,
            scholarity: this.state.scholarity,
            password: this.state.password,
        }

        if(user.full_name !== "" || user.cpf !== "" || user.email!== "" || user.password !== "" || user.birth_date !== "" || user.scholarity!== ""){
            registerUser(user).then(res => {
              //  this.props.history.push('/login')
              History.push('/login')
                
            })
            this.setState({registered: true})
            
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
                                Registro
                            </h1>
                            <div className="form-group">
                                <label htmlFor="full_name">Nome completo</label>
                                <input type="text" className="form-control" name="full_name" placeholder="Insira seu nome completo" value={this.state.full_name} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Insira seu email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" className="form-control" name="cpf" placeholder="Insira seu CPF" value={this.state.cpf} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birth_date">Data de Nascimento</label>
                                <input type="date" className="form-control" name="birth_date" placeholder="Insira sua data de nascimento" value={this.state.birth_date} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="scholarity">Escolaridade</label>
                                <br/>
                                <select name="scholarity" value={this.state.scholarity} onChange={this.onChange}>
                                {this.state.scholarities.map((obj, index) => {
                                    return (
                                    <option key={`${index}-${obj.c}`} value={obj.c}>
                                        {obj.c}{" "}
                                    </option>
                                    );
                                })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" className="form-control" name="password" placeholder="Insira senha" value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <Popup text={this.state.registered ? "Registrado!": "Algum campo está incompleto"}/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterUser
