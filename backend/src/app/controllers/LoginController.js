const Yup = require('yup');
const Todo = require('../models/User');

const schema = Yup.object().shape({
  value: Yup.string().required()
});