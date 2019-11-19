const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const Doctor = require("../models/Doctor")
process.env.SECRET_KEY = "secret"

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'tecmed49@gmail.com',
      pass: 'tecmedproj'
  } 
});

class LoginController {


  async register(req, res) {
    
    function regis(userData){
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
    }
    const today = new Date()
    if(req.body.isHealthProfessional==="false"){
      const userData = {
        full_name: req.body.full_name,
        cpf: req.body.cpf,
        birth_date: req.body.birth_date,
        scholarity: req.body.scholarity,
        email: req.body.email,
        password: req.body.password,
        cpf: req.body.cpf,
        created: today
      }
  
      User.findOne({
        email: req.body.email
      })
        .then(user => {
          if (!user) {
            regis(userData)
          } else {
            res.json({ error: 'User already exists' })
            console.log("user already exists")
          }
        })
        .catch(err => {
          res.send("error" + err)
        })
    }else{
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
  
      Doctor.findOne({
        email: req.body.email
      })
        .then(user => {
          if (!user) {
            regis(userData)
          } else {
            res.json({ error: 'User already exists' })
            console.log("user already exists")
          }
        })
        .catch(err => {
          res.send("error" + err)
        })
    }
  }


  async registerUser(req, res) {
    const today = new Date()
    const userData = {
      full_name: req.body.full_name,
      cpf: req.body.cpf,
      birth_date: req.body.birth_date,
      scholarity: req.body.scholarity,
      email: req.body.email,
      password: req.body.password,
      cpf: req.body.cpf
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
    function f(user){
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
    }
    if(req.body.isHealthProfessional === "true"){
      Doctor.findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          f(user)
        }else{
          res.json({ error: "User does not exist" })
        }
      })
      .catch(err => {
        res.send("error: " + err)
      })
    }else{
      User.findOne({
        email: req.body.email
      })
        .then(user => {
          if (user) {
            f(user)
          } else {
            res.json({ error: "User does not exist" })
  
          }
        })
        .catch(err => {
          res.send("error: " + err)
        })
    }
    
  }

  async reset(req, res) {
    const url = req.originalUrl
    const urlSplit = url.split("/")
    const userType = urlSplit[3] 
    const token = urlSplit[4]

    function f(user){
      if (req.body.password===undefined){
        res.json({error: "n tem senha"})
      }
      console.log(Date.now() - user.resetPasswordExpires)
      if(Date.now() - user.resetPasswordExpires > 0){
        console.log("velho")
        res.send({status: "old token"})
      }else{
        console.log("novo")
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash
          user.resetPasswordToken = undefined
          user.resetPasswordExpires = undefined
          user.save()
            .then(
              res.json({ status: "password has been updated" })
            )
            .catch(err => {
              res.send({error : err})
            })
        })
      }
    }

    if(userType === "healthProfessional"){
      Doctor.findOne({
        resetPasswordToken: token
      }).then(user => {
        if(user){
          f(user)
        }else{
          res.json({error: "invalid token"})
        }
      })
    }else if(userType === "user"){
      User.findOne({
        resetPasswordToken: token
      }).then(user => {
        if(user){
          f(user)
        }else{
          res.json({error: "invalid token"})
        }
      })
    }
  }

  async forgot(req, res) {
    const from = 'TecMed'
    const subject = 'password reset'
    

    function mail(user, userType){
      const bytes = crypto.randomBytes(20)
      const token = bytes.toString("hex")
      const hrs = 2

      user.resetPasswordToken = token
      user.resetPasswordExpires =  Date.now() + 3600000*hrs
      user.save()
      const mailOptions = {
        from: from,
        to: user.email,
        subject: subject,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/routes/reset/' + userType + "/" + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
      res.json({ success: "email sent with success" })
    }

    if(req.body.isHealthProfessional === "true"){
      Doctor.findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          mail(user, "healthProfessional")
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
          mail(user, "user")
        }else{
          res.json({ error: "User does not exist" })
        }
      })
    }
  }
}
module.exports = new LoginController();