const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  last_name: {
      type: String,
      required: true
    },
  cpf: {
    type: String,
    required: true
  },
  birth_date: {
    type: String,
    required: true,
    unique: true
  },
  scholarity: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: false,
    default: 0
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


module.exports = mongoose.model("usuarios", UserSchema);
