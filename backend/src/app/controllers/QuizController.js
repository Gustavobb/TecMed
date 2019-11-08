
const videoModel = require('../models/VideoModel');


class QuizController {

    async getQuiz(req, res) {

        var quiz = await videoModel.find().exec();
        res.send(quiz)
    
    }

    async addQuiz(req, res){
        var quiz = new videoModel(req.body)
        quiz.save()
        
    }
}


module.exports = new QuizController();