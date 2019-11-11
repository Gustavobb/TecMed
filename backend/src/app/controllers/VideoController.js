
const videoModel = require('../models/VideoModel');


class VideoController {

    async getVideos(req, res) {
        var quiz = await videoModel.find().exec();
        res.send(quiz)
    }

    async addVideo(req, res){
        var quiz = new videoModel(req.body)
        await quiz.save()
    }

    async getVideoById(req, res){
        var id = req.query.id
         videoModel.findById(id, (error, data)=>{
            res.send(data)
        })
        
    }

    async getVideoQuiz(req, res) {
        // Pega quiz do vídeo
    }
}


module.exports = new VideoController();