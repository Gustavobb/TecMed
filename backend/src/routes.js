const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())

const LoginController = require('./app/controllers/LoginController');

routes.post('/register', LoginController.register);
routes.post('/login',LoginController.login);


module.exports = routes;