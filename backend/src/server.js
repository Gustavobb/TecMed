const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Routes = require('./routes');
var port = process.env.PORT || 4000
const mongoURI = "mongodb://localhost:27017/TecMed"

class App {
  constructor() {
    this.server = Express();
    this.database();
    this.connect()
    this.middlewares();
    this.routes();
  }
  connect(){
    this.server.listen(port, ()=>{
      console.log("Server is litstening on port: ", port)
    })
  }
  database() {
    mongoose
      .connect(mongoURI, { useNewUrlParser: true })
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