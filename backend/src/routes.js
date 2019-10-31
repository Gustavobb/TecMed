const { Router } = require('express');
const routes = new Router();

const TodoController = require('./app/controllers/TodoController');

routes.get('/users/:user/todo', TodoController.index);
routes.post('/users/:user/todo', TodoController.store);
routes.put('/users/:user/todo/:todo', TodoController.update);
routes.delete('/users/:user/todo/:todo', TodoController.delete);

module.exports = routes;