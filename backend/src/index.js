require('dotenv').config();
const app = require('./server');

var port = process.env.PORT || 9000

app.listen(port, () => {
  console.log("server is running on port:" + port)
})