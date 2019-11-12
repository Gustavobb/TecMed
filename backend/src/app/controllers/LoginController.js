const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Doctor = require("../models/Doctor")
process.env.SECRET_KEY = "secret"



class LoginController {

  async registerUser(req, res) {
    const today = new Date()
    const userData = {
      full_name: req.body.full_name,
      cpf: req.body.cpf,
      birth_date: req.body.birth_date,
      scholarity: req.body.scholarity,
      email: req.body.email,
      password: req.body.password,
      created: today

    }

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
                console.log(user.email + "registered")
              })
              .catch(err => {
                res.send("error " + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
          console.log("user already exists")
        }
      })
      .catch(err => {
        res.send("error" + err)
      })
  }

  async registerDoctor(req, res) {
    const today = new Date()
    const userData = {
      full_name: req.body.full_name,
      cpf: req.body.cpf,
      council: req.body.council,
      council_state: req.body.council_state,
      council_number: req.body.council_number,
      graduation_degree: req.body.graduation_degree,
      email: req.body.email,
      password: req.body.password,
      created: today

    }
    console.log(userData)

    Doctor.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash
            Doctor.create(userData)
              .then(user => {
                res.json({ status: user.email + ' registered!' })
                console.log(user.email + "registered")
              })
              .catch(err => {
                res.send("error " + err)
              })
          })
        } else {
          res.json({ error: 'User already exists' })
          console.log("user already exists")
        }
      })
      .catch(err => {
        res.send("error" + err)
      })
  }

  async login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1400
            })
            res.send(token)
          } else {
            res.json({ error: "User does not exists" })
          }
        } else {
          res.json({ error: "User does not exist" })

        }
      })
      .catch(err => {
        res.send("error: " + err)
      })
  }
}
module.exports = new LoginController();