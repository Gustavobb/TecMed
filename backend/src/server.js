const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/LoginUsers"
const Routes = require('./routes')
var app = Express();
var port = process.env.PORT || 9000

app.listen(port, () => {
  console.log("server is running on port:" + port)
})



class App {
  constructor() {
    this.server = Express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose
    .connect(mongoURI , {useNewUrlParser: true})
    .then(() => console.log("MongoDB"))
    .catch((err => console.log(err)))
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