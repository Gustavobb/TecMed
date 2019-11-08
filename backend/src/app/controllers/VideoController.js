
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
        videoModel.findOne({title:"Minuto ao ponto: SUICÍDIO"}, (e, data)=>{
            res.send(data)
            console.log("nice?")
        })
        


    }
}


module.exports = new VideoController();