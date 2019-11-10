
const videoModel = require('../models/VideoModel');


class VideoController {

    async getVideos(req, res) {
        var model = await videoModel.find().exec();
        res.send(model)
    }

    async addVideo(req, res){
        var model = new videoModel(req.body)
        await model.save()
    }

    async getVideoById(req, res){
        var id = req.query.id
         videoModel.findById(id, (error, data)=>{
            res.send(data)
        })
    }
}


module.exports = new VideoController();