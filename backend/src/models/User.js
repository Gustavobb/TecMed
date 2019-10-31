const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
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
      required: true,
      default: 0
    },
    cpf: {
      type: String,
      required: true
    },
    celphoneNumber: {
      type: Number,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    isHealthProfessional: {
      type: Boolean,
      required: true,
      default: false
    },
    isRevisor: {
      type: Boolean,
      required: true,
      default: false
    },
    profession: {
      type: String,
      required: false
    },
    professionalId: {
      type: String,
      required: false
    }
  });
  
  
  module.exports = User =  mongoose.model("usuarios", UserSchema);