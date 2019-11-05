
import api from '../services/api'

export const register = async newUser => {
    await api
        .post('routes/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
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

