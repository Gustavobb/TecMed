const express = require("express")
const users = express.Router()
var cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = "secret"

// users.post("/forgotPsw", (req, res) => {
//     const email = req.body.email
//     User.findOne({
//         email: req.body.email
//     })
//     .then(user => {
//         if(user) {
//             var mailOptions = {
//                 to: user.email,
//                 from: 'noreply@tecmed.com',
//                 subject: 'TecMed password reset',
//                 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                   'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                   'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                   'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//               };
//         }else{
//             res.json({error: "Email not registred"})
//             }
//         })   
//         .catch(err => {
//             res.send("error: " + err)
//         })
//     })
// })

users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: today,
        cpf: req.body.cpf,
        celphoneNumber: req.body.celphoneNumber,
        birthDate: req.body.birthDate,
        isHealthProfessional: req.body.isHealthProfessional,
        profession: req.body.profession,
        professionId: req.body.professionId,
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err,hash) =>{
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered!' })
                })
                .catch(err =>{
                    res.send("error " + err)
                })
            })
       }else{
           res.json({error: 'User already exists'})
       }
    })
    .catch(err => {
        res.send("error" + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isHealthProfessional: user.isHealthProfessional,
                    isRevisor: user.isRevisor,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1400
                })
                res.send(token)
            } else {
                res.json({ error: "User does not exists"})
            }
        }else{
            res.json({error: "User does not exist"})

            }
        })   
        .catch(err => {
            res.send("error: " + err)
        })
    })

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    
    User.findOne({
        _id: decoded._id
    })
        .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.send('User does not exist')
        }
        })
        .catch(err => {
        res.send('error: ' + err)
        })
    })

module.exports = users