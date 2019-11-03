// const { Router } = require('express');
// const routes = new Router();
const express = require("express")
const routes = express.Router()
var cors = require('cors')
routes.use(cors())


const ExampleController = require('./app/controllers/ExampleController');
const LoginController = require('./app/controllers/LoginController');

// routes.get('/users/:user/Example', ExampleController.index);
routes.post('/register', LoginController.store);
// routes.put('/users/:user/Example/:Example', ExampleController.update);
// routes.delete('/users/:user/Example/:Example', ExampleController.delete);

module.exports = routes;