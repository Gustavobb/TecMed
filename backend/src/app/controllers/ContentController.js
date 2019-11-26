
const ContentModel = require('../models/VideoModel');


class ContentController {

    async getContents(req, res) {
        try {
            var model = await ContentModel.find({ "awsS3.status": true, "videoSpecifications.reviewed": true }).exec();
            console.log(model)

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
            const id = req.params.id;
            var quiz = {
                question: req.body.question,
                alternatives: req.body.alternatives,
                difficulty: req.body.difficulty
            }
            var model = await ContentModel.findOneAndUpdate({_id: id},{$push: {quiz: quiz}});
            await model.save()
            
        } catch (e) {
            console.error(e)
        }
    }

    async updateVideoReviewedStatus(req, res) {
        try{
            const id = req.params.id;
            const reviewer = req.body.reviewer;
            var model = await ContentModel.findOneAndUpdate({_id: id}, {"videoSpecifications.reviewed": true, "videoSpecifications.reviewer": reviewer});
            await model.save()
        } catch (e) {
            console.error(e)
        }
    }


    async getUnreviewedVideos(req, res) {

        try {
            var model = await ContentModel.find({ "awsS3.status": true, "videoSpecifications.reviewed": false }).exec();
            res.send(model)
            
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new ContentController();
