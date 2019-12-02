const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: false
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
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  council: {
    type: String,
    required: false
  },
  council_state: {
    type: String,
    required: false
  },
  graduation_degree: {
    type: String,
    required: false
  },
  resetPasswordToken: {
    type: String, 
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  token: {
    type: String,
    required: false
  }
});



module.exports = mongoose.model("reviewer", UserSchema);
