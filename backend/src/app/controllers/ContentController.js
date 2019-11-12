
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

    async getUnreviewedVideos(req, res) {
        var model = await ContentModel.findAll({ awsS3: { status: true }, videoSpecifications: { reviwed: false } }).exec();
        res.send(model)
    }
}


module.exports = new ContentController();