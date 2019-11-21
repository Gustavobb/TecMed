
import api from '../services/api'

export const registerDoctor = async newUser => {
    await api
        .post('routes/register', {
            full_name: newUser.full_name,
            cpf: newUser.cpf,
            council: newUser.council,
            council_state: newUser.council_state,
            council_number: newUser.council_number,
            graduation_degree: newUser.graduation_degree,
            certificate: newUser.certificate,
            email: newUser.email,
            password: newUser.password,
            userType: "doctor",
        })
        .then(res => {
            console.log("Registered")
        })
}

// export const registerAvaliador = async newUser => {
//     await api
//         .post('routes/register', {
//             full_name: newUser.full_name,
//             cpf: newUser.cpf,
//             council: newUser.council,
//             council_state: newUser.council_state,
//             council_number: newUser.council_number,
//             graduation_degree: newUser.graduation_degree,
//             certificate: newUser.certificate,
//             email: newUser.email,
//             password: newUser.password,
//             userType: "avaliador",
//         })
//         .then(res => {
//             console.log("Registered")
//         })
// }

export const registerUser = async newUser => {
    await api
        .post('routes/register', {
            full_name: newUser.full_name,
            cpf: newUser.cpf,
            birth_date: newUser.birth_date,
            scholarity: newUser.scholarity,
            email: newUser.email,
            password: newUser.password,
            userType: "user",
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
            userType: user.userType,
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const forgot = async user => {
    await api
        .post('routes/forgot', {
            email: user.email,
            userType: user.userType,
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const reset = async user => {
    await api
        .post('routes/reset', {
            userType: user.userType,
            password: user.password,
            token: user.token,
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}