const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserHealthSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
      type: String,
      required: true
    },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: false,
    default: 0
  }
  // cpf: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // birthDate: {
  //   type: Date,
  //   required: true
  // },
  // isHealthProfessional: {
  //   type: Boolean,
  //   required: true,
  //   default: false
  // },
  // isRevisor: {
  //   type: Boolean,
  //   required: true,
  //   default: false
  // },
  // profession: {
  //   type: String,
  //   required: false
  // },
  // professionalId: {
  //   type: String,
  //   required: false
  // }
  });
  
  
  module.exports = mongoose.model("usuariosSaude", UserHealthSchema);