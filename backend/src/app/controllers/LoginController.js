// const Yup = require('yup');
// const Todo = require('../models/User');
// const express = require("express")
// const users = express.Router()
// var cors = require('cors')
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
var cors = require('cors')
// users.use(cors())

process.env.SECRET_KEY = "secret"

// const schema = Yup.object().shape({
//   value: Yup.string().required()
// });

class LoginController {

  async store(req, res) {
    const today = new Date()
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      created: today

    }
    console.log(userData)
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            User.create(userData)
              .then(user => {
                res.json({ status: user.email + ' registered!' })
              })
              .catch(err => {
                res.send("error " + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send("error" + err)
      })
  }
}
module.exports = new LoginController();