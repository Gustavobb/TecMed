const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var Bull = require("bull")
process.env.SECRET_KEY = "secret"

const sendPswResetEmailQueue = new Bull('sendPswResetEmail', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
})

const mailerOptions = {
  attempts: 3
}

let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
  }
});

sendPswResetEmailQueue.process(async (job) =>  {
  console.log(job)
  // let info = await transporter.sendMail(job.)
  return
})


class LoginController {

  async register(req, res) {
    const today = new Date()
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
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
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(user){
        const bytes = crypto.randomBytes(20)
        const token = bytes.toString('hex');
        const job = sendPswResetEmailQueue.add({
          from: 'no-reply@tecmed.com',
          to: user.email,
          subject: "Reset password",
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/routes/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        })
      }
    })
  }

  async reset(req, res){
    
  }
}
module.exports = new LoginController();