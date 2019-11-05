require('dotenv').config();
const app = require('./server');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});