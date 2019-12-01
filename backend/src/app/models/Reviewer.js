const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  council_number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  council: {
    type: String,
    required: true
  },
  council_state: {
    type: String,
    required: true
  },
  graduation_degree: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String, 
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  }

});



module.exports = mongoose.model("reviewer", UserSchema);
