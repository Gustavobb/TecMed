
const videoModel = require('../models/VideoModel');


class QuizController {

    async getVideo(req, res) {

        var quiz = await videoModel.find().exec();
        res.send(quiz)
    
    }

    async addVideo(req, res){
        var quiz = new videoModel(req.body)
        quiz.save()
        
    }

    async getVideoById(req, res){

    }
}


module.exports = new QuizController();