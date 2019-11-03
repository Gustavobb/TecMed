const { Router } = require('express');
const routes = new Router();


const ExampleController = require('./app/controllers/ExampleController');
const LoginController = require('./app/controllers/LoginController');

// routes.get('/users/:user/Example', ExampleController.index);
routes.post('/resgister', LoginController.store);
// routes.put('/users/:user/Example/:Example', ExampleController.update);
// routes.delete('/users/:user/Example/:Example', ExampleController.delete);

module.exports = routes;