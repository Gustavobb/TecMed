
const ContentModel = require('../models/VideoModel');


class ContentController {

    async getContents(req, res) {
        var model = await ContentModel.findAll({ awsS3: { status: true }, videoSpecifications: { reviwed: true } }).exec();
        res.send(model)
    }

    async getContentById(req, res) {
        var id = req.query.id
        ContentModel.findById(id, (error, data) => {
            res.send(data)
        })
    }


    async updateVideoQuiz(req, res) {
        var model = new videoModel(req.body)
        const id = req.query.id // get video id on the query
        model.findById(id, (err, data)=>{
            if (err) {console.log('Erro ao salvar o quiz: ' + err);}
            else {
                model.update(req.body.quiz);
                model.save();
            };
        })
    }

    async getUnreviewedVideos(req, res) {
        var model = await ContentModel.findAll({ awsS3: { status: true }, videoSpecifications: { reviwed: false } }).exec();
        res.send(model)
    }
}


module.exports = new ContentController();