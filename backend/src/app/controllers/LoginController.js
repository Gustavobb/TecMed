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
            res.json({ status: 'error' })
            console.log("user already exists")
          }
        })
        .catch(err => {
          res.json({ status: 'error' , err: err})
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
            res.json({ status: 'error' })
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
            res.json({ status: 'error' })
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
          full_name: user.full_name,
          cpf: user.cpf,
          email: user.email,
          birth_date: user.birth_date,
          scholarity: user.scholarity,
          council: user.council,
          council_state: user.council_state,
          council_number: user.council_number,
          graduation_degree: user.graduation_degree,
          certificate: user.certificate,
          score: user.score
        }
        // console.log(payload)
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1400
        })

        res.json({ token: token,
                   userType: req.body.userType,
                   _id: user._id })
      } else {
        res.json({ status: "error" })
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
          res.json({ status: "error" })
        }
      })
      .catch(err => {
        res.json({ status: 'error' , err: err})
      })
    }else if(req.body.userType === "user"){
      User.findOne({
        email: req.body.email
      })
        .then(user => {
          if (user) {
            f(user)
          } else {
            res.json({ status: "error" })
  
          }
        })
        .catch(err => {
          res.json({ status: 'error' , err: err})
        })
    }else if(req.body.userType === "reviewer"){
      Reviewer.findOne({
        email: req.body.email
      })
        .then(user => {
          if (user) {
            f(user)
          } else {
            res.json({ status: "error" })
  
          }
        })
        .catch(err => {
          res.json({ status: 'error' , err: err})
        })
    }
    
  }

  async reset(req, res) {
    const userType = req.body.userType 
    const token = req.body.token

    function f(user){
      if (req.body.password===undefined){
        res.json({status: "error"})
      }
      if(Date.now() - user.resetPasswordExpires > 0){
        res.send({status: "error"})
      }else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash
          user.resetPasswordToken = undefined
          user.resetPasswordExpires = undefined
          user.save()
            .then(
              res.json({ status: "success" })
            )
            .catch(err => {
              res.json({ status: 'error' , err: err})
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
          res.json({status: "error"})
        }
      })
    }else if(userType === "user"){
      User.findOne({
        resetPasswordToken: token
      }).then(user => {
        if(user){
          f(user)
        }else{
          res.json({status: "error"})
        }
      })
    }else if(userType === "reviewer"){
      Reviewer.findOne({
        resetPasswordToken: token
      }).then(user => {
        if(user){
          f(user)
        }else{
          res.json({status: "error"})
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
      // console.log('http://localhost:3000/reset/' + userType + "/" + token)
      user.resetPasswordExpires =  Date.now() + 3600000*hrs
      user.save()
      const mailOptions = {
        from: from,
        to: user.email,
        subject: subject,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:3000/reset/' + userType + "/" + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
      transporter.sendMail(mailOptions, function(error, info){
        // if(error){
        //     return console.log(error);
        // }
        // console.log('Message sent: ' + info.response);
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
          res.json({ status: "error" })
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
          res.json({ status: "error" })
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
          res.json({ status: "error" })
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

  async getScore(req, res) {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user){
        res.json({score: user.score})
      }else{
        res.json({status: "error"})
      }
    })
  }

  async getRanking(req, res){
    try {
        var model = await User.find().limit(10).sort({score:-1}).exec()
        res.send(model)
    } catch(e){
        console.error(e)
    }
}

}
module.exports = new LoginController();