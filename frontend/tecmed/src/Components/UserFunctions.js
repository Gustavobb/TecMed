
import api from '../services/api'

export const registerDoctor = async newUser => {
    await api
        .post('routes/registerDoctor', {
            full_name: newUser.full_name,
            cpf: newUser.cpf,
            council: newUser.council,
            council_state: newUser.council_state,
            council_number: newUser.council_number,
            graduation_degree: newUser.graduation_degree,
            certificate: newUser.certificate,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log("Registered")
        })
}

export const registerUser = async newUser => {
    await api
        .post('routes/registerUser', {
            full_name: newUser.full_name,
            cpf: newUser.cpf,
            birth_date: newUser.birth_date,
            scholarity: newUser.scholarity,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log("Registered")
        })
}

export const login = async user => {
    await api
        .post('routes/login', {
            email: user.email,
            password: user.password,
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

