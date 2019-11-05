const express = require("express")
const users = express.Router()
var cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = "secret"

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