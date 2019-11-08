
const videoModel = require('../models/VideoModel');


class VideoController {

    async getVideos(req, res) {

        var quiz = await videoModel.find().exec();
        res.send(quiz)
    
    }

    async addVideo(req, res){
        //var quiz = new videoModel(req.body)
        //await quiz.save()
        console.log(req.body)
        res.send(req.body)

        
    }

    async getVideoById(req, res){
        var id = req.query.id
         videoModel.findById(id, (error, data)=>{
            res.send(data)
        })
        


    }
}


module.exports = new VideoController();