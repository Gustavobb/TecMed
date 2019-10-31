const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Routes = require('./routes');

class App {
  constructor() {
    this.server = Express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(Express.json());
  }
  
  routes() {
    this.server.use('/v1', Routes);

    this.server.use((req, res) => {
      res.status(404).json({ error: 'pagina não encontrada' });
    });

    this.server.use((error, req, res, next) => {
      res.status(500).json({ error: 'erro interno' });
    });
  }
}

module.exports = new App().server;