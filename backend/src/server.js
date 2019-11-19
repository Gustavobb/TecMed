const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://tecmed:tecmed@tecmed-cmq2p.mongodb.net/TecMed"
const Routes = require('./routes')
var bodyParser = require("body-parser")

class App {
  constructor() {
    this.server = Express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose
      .connect(mongoURI, { useNewUrlParser: true })
      .then(() => console.log("MongoDB"))
      .catch((err => console.log(err)))
      mongoose.set('useFindAndModify', false);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(Express.json());
    this.server.use(bodyParser.json())
    this.server.use(
      bodyParser.urlencoded({
        extended: false
      })
    )
  }

  routes() {
    this.server.use('/routes', Routes);

    this.server.use((req, res) => {
      res.status(404).json({ error: 'pagina não encontrada' });
    });

    this.server.use((error, req, res, next) => {
      res.status(500).json({ error: 'erro interno' });
    });
  }
}

module.exports = new App().server;
