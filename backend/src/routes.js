const { Router } = require('express');
const routes = new Router();
//const Quiz = require('./app/controllers/Quiz')
const Quiz = require('./app/controllers/Quiz')
const ExampleController = require('./app/controllers/ExampleController');

routes.get('/users/:user/Example', ExampleController.index);
routes.post('/users/:user/Example', ExampleController.store);
routes.put('/users/:user/Example/:Example', ExampleController.update);
routes.get('/',Quiz)
routes.delete('/users/:user/Example/:Example', ExampleController.delete);

module.exports = routes;