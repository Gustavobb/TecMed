
const ContentModel = require('../models/VideoModel');


class ContentController {

    async getContents(req, res) {
        try {
            var model = await ContentModel.findAll({ "awsS3.status": true, "videoSpecifications.reviewed": true }).exec();
            res.send(model)

        } catch (e) {
            console.error(e)
        }
    }

    async getContentById(req, res) {

        try {
            var id = req.query.id
            const data = await ContentModel.findById(id)
            res.send(data)

        } catch (e) {
            console.error(e)
        }
    }

    async updateVideoQuiz(req, res) {

        try {
            const id = req.params.id
            var model = await ContentModel.findById(id)

            await model.set('quiz', req.body.quiz);
            await model.save();
            
        } catch (e) {
            console.error(e)
        }
    }

    async getUnreviewedVideos(req, res) {

        try {
            var model = await ContentModel.findAll({ "awsS3.status": true, "videoSpecifications.reviewed": false }).exec();
            res.send(model)
            
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new ContentController();
