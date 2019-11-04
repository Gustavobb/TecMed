const Mongoose = require('mongoose');

const quizModel = Mongoose.model("quiz", {
    title: String,
    category: String,
    video: String,
    revisor: String,
    quiz: {
        question : String,
        answers: [String],
        correct: String
    }
})


module.exports = quizModel