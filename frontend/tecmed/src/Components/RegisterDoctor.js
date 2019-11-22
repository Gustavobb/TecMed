import React, { Component } from 'react'
import { registerDoctor } from './UserFunctions'
import History from './History'
import axios from 'axios'

class RegisterDoctor extends Component {
    constructor() {
        super()
        this.state = {
            full_name: '',
            cpf: '',
            email: '',
            council: undefined,
            graduation_degree: undefined,
            council_state: undefined,
            council_number: '',
            certificate: undefined,
            password: '',
            userType: 'doctor',
            handleClick: this.handleClick.bind(this),
            councils: [{ "counc": "conselho 1" }, { "counc": "conselho 2" }, { "counc": "conselho 3" }, { "counc": "conselho 4" }],
            council_states: [{ "c": "AC" }, { "c": "AL" }, { "c": "AP" }, { "c": "AM" }, { "c": "BA" }, { "c": "CE" }, { "c": "DF" }, { "c": "ES" }, { "c": "GO" }, { "c": "MA" }, { "c": "MT" }, { "c": "MS" }, { "c": "MG" }, { "c": "PA" }, { "c": "PB" }, { "c": "PR" }, { "c": "PE" }, { "c": "PI" }, { "c": "RJ" }, { "c": "RN" }, { "c": "RS" }, { "c": "RO" }, { "c": "RR" }, { "c": "SC" }, { "c": "SP" }, { "c": "SE" }, { "c": "TO" }],
            graduation_degrees: [{ "degree": "Faculdade de Medicina" }, { "degree": "Pós Graduação" }, { "degree": "Residência" }],
            registered: false,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async awsPost(file) {

        var options = {
            headers: {
                'Content-Type': file[0].type
            }
        };

        try {
            const response = await axios.get('http://localhost:9000/routes/getPreSignedUrl')
            console.log(response.data.url)
            const data = await axios.put(response.data.url, file[0], options).then((data) => {
                return data
            })

            if (data.statusText == "OK") {
                await axios.post('http://localhost:9000/routes/awsVideoPost/' + response.data.id)
            }

            console.log(data)

        } catch (e) {
            console.error(e)
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log("name" + e.target.name)
        console.log("value" + e.target.value)
    };

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            full_name: this.state.full_name,
            email: this.state.email,
            cpf: this.state.cpf,
            council: this.state.council,
            council_state: this.state.council_state,
            council_number: this.state.council_number,
            graduation_degree: this.state.graduation_degree,
            certificate: this.state.certificate,
            password: this.state.password,
        }

        if (user.full_name !== "" || user.cpf !== "" || user.email !== "" || user.password !== "" || user.council_number !== "" || user.council_state !== undefined || user.council !== undefined || user.graduation_degree !== undefined || user.certificate !== "") {
            registerDoctor(user).then(res => {
                //  this.props.history.push('/login')
                History.push('/login')

            })
            this.setState({ registered: true })

        } else {
            console.log("algum campo está vazio")
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Registro
                            </h1>
                            <div className="form-group">
                                <label htmlFor="full_name">Nome completo</label>
                                <input type="text" className="form-control" name="full_name" placeholder="Insira seu nome completo" value={this.state.full_name} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Insira seu email" value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" className="form-control" name="cpf" placeholder="Insira seu CPF" value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="council">Conselho</label>
                                <br />
                                <select name="council" value={this.state.council} onChange={this.onChange}>
                                    {this.state.councils.map((obj, index) => {
                                        return (
                                            <option key={`${index}-${obj.counc}`} value={obj.counc}>
                                                {obj.counc}{" "}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="council_state">Estado do conselho</label>
                                <br />
                                <select name="council_state" value={this.state.council_state} onChange={this.onChange}>
                                    {this.state.council_states.map((obj, index) => {
                                        return (
                                            <option key={`${index}-${obj.c}`} value={obj.c}>
                                                {obj.c}{" "}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="council_number">Número do conselho</label>
                                <input type="text" className="form-control" name="council_number" placeholder="Insira seu número de conselho" value={this.state.council_number} onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="graduation_degree">Grau de formação</label>
                                <br />
                                <select name="graduation_degree" value={this.state.graduation_degree} onChange={this.onChange}>
                                    {this.state.graduation_degrees.map((obj, index) => {
                                        return (
                                            <option key={`${index}-${obj.degree}`} value={obj.degree}>
                                                {obj.degree}{" "}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="certificate">Anexe sua certidão negativa de conselho regional</label>
                                <input name="certificate" type="file" id="file" ref="fileUploader" onChange={(e) => this.awsPost(e.target.files)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" className="form-control" name="password" placeholder="Insira senha" value={this.state.password} onChange={this.onChange} />
                            </div>
                            <button type="submit" className="form-control">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterDoctor
