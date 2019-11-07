const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const healthProfessionalUser = require("../models/HealthProfessionalUser")
const nodemailer = require('nodemailer');
process.env.SECRET_KEY = "secret"

let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
  }
});

class LoginController {

  async register(req, res) {
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
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

  async forgot(req, res) {
    if(req.body.isHealthProfessional){
      healthProfessionalUser.findOne({
        email: req.body.email
      }).then(user => {
        if(user){
          let info = await transporter.sendMail({
            from: '"TecMed 👻" <no-reply@tecmed.com>',
            to: user.email,
            subject: 'password reset',
            text: 'email de recuperacao de senha, toma seu link ai\nhttps://google.com'
        });
        }else{
          res.json({ error: "User does not exist" })
        }
      })
    }else{
      User.findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          let info = await transporter.sendMail({
            from: '"TecMed 👻" <no-reply@tecmed.com>',
            to: user.email,
            subject: 'password reset',
            text: 'email de recuperacao de senha, toma seu link ai\nhttps://google.com'
        });
        }else{
          res.json({ error: "User does not exist" })
        }
      })
    }
  }
}
module.exports = new LoginController();