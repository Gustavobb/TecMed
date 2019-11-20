const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Doctor = require("../models/Doctor")
const Reviewer = require("../models/Reviewer")
const nodemailer = require('nodemailer');
const crypto = require('crypto')
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
      console.log(userData)
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        if(req.body.userType === "user"){
          User.create(userData)
          .then(user => {
            res.json({ status: user.email + ' registered!' })
            console.log(user.email + "registered")
          })
          .catch(err => {
            res.send("error " + err)
          })
        }else if(req.body.userType === "doctor"){
          Doctor.create(userData)
          .then(user => {
            res.json({ status: user.email + ' registered'})
            console.log(user.email + "registered")
          })
          .catch(err => {
            res.send("error " + err)
          })
        }else if(req.body.userType === "reviewer"){
          Reviewer.create(userData)
          .then(user => {
            res.json({ status: user.email + ' registered'})
            console.log(user.email + "registered")
          })
          .catch(err => {
            res.send("error " + err)
          })
        }
      })
    }
    const today = new Date()

    if(req.body.userType === "user"){
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
            regis(userData)
          } else {
            res.json({ error: 'User already exists' })
            console.log("user already exists")
          }
        })
        .catch(err => {
          res.send("error" + err)
        })
    }else if(req.body.userType === "doctor"){
      console.log("medico")
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
    }else if(req.body.userType === "reviewer"){
      console.log("Reviewer")
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
  
      Reviewer.findOne({
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
    if(req.body.userType === "doctor"){
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
    }else if(req.body.userType === "user"){
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
    }else if(req.body.userType === "reviewer"){
      Reviewer.findOne({
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
        res.send({status: "old token"})
      }else{
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

    if(userType === "doctor"){
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
    }else if(userType === "reviewer"){
      Reviewer.findOne({
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

    if(req.body.userType === "doctor"){
      Doctor.findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          mail(user, "doctor")
        }else{
          res.json({ error: "User does not exist" })
        }
      })
    }else if(req.body.userType === "user"){
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
    }else if(req.body.userType === "reviewer"){
      Reviewer.findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          mail(user, "reviewer")
        }else{
          res.json({ error: "User does not exist" })
        }
      })
    }
  }

  async updateScore(req, res) {
    try {
      const id = req.body.id
      const score = req.body.score

      var model = await User.findOneAndUpdate({_id:id},{$inc:{score:score}})
      await model.save()
        } catch (e) {
      console.error(e)
    }
  }

}
module.exports = new LoginController();