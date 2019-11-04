const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
process.env.SECRET_KEY = "secret"



class LoginController {

  async register(req, res) {
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

  async login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              name: user.name,
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