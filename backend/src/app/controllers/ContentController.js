
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

    async upodateVideoQuiz(req, res) {
        var model = new videoModel(req.body)
        const id = req.query.id // get video id on the query
        model.findById(id, (err, data)=>{
            if (err) {console.log('Erro ao salvar o quiz: ' + err);}
            else{
                model.update(req.body.quiz);
                await model.save();
            };
        })
    }
}


module.exports = new ContentController();