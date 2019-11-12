
const ContentModel = require('../models/VideoModel');


class ContentController {

    async getContents(req, res) {
        var model = await ContentModel.find().exec();
        res.send(model)
    }

    async addContent(req, res){
        var model = new ContentModel(req.body)
        await model.save()
    }

    async getContentById(req, res){
        var id = req.query.id
         ContentModel.findById(id, (error, data)=>{
            res.send(data)
        })
    }

    async getContentQuiz(req, res) {
        // Pega quiz do vídeo
    }
}


module.exports = new ContentController();