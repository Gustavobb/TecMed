
const ContentModel = require('../models/VideoModel');


class ContentController {

    async startId(req, res){
        try {
            const newVideoModel = {
                videoSpecifications: {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    creator: req.body.creator,
                    reviewed: false,
                    clicked: 0
                }
            }

            let model = new ContentModel(newVideoModel)
            await model.save()
        } catch (e){
            console.error(e)
        }
    }

    async getContents(req, res) {
        try {
            var model = await ContentModel.find({"videoSpecifications.reviewed": true}).exec();
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

    async getContentByCategory(req, res) {
        try {
            const category = req.query.category;
            var model = await ContentModel.find({"videoSpecifications.reviewed": true, "videoSpecifications.category": category})
            res.send(model)
        } catch(e) {
            console.error(e)
        }
    }

    async updateVideoQuiz(req, res) {
        try {
            const id = req.params.id;
            const quiz = {
                question: req.body.question,
                alternatives: req.body.alternatives,
                difficulty: req.body.difficulty,
                correct: 0
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
            var model = await ContentModel.find({ "videoSpecifications.reviewed": false }).exec();
            res.send(model)
            
        } catch (e) {
            console.error(e)
        }
    }

    async getUnreviewedByCategory(req, res) {
        try {
            const category = req.query.category;
            var model = await ContentModel.find({"videoSpecifications.reviewed": false, "videoSpecifications.category": category})
            res.send(model)
        } catch(e) {
            console.error(e)
        }
    }
    async updateViews(req, res){
        try {    
            const correct = req.body.correct
            const id = req.body.id
            if (correct){
                var model = await ContentModel.findOneAndUpdate({"quiz._id":id},{$inc:{"videoSpecifications.clicked":1, "quiz.$.counter":1, "quiz.$.correct":1}})
            } else {
                var model = await ContentModel.findOneAndUpdate({"quiz._id":id},{$inc:{"videoSpecifications.clicked":1, "quiz.$.counter":1}})
            }
            
            model.save()
        } catch(e){
            console.error(e)
        }
    }
    async getVideoStats(req, res){
        try {
            var model = await ContentModel.find({"videoSpecifications.reviewed":true}).limit(10).sort({"videoSpecifications.clicked":-1}).select({"videoSpecifications.id":1,"videoSpecifications.title":1,"videoSpecifications.clicked":1}).exec()
            res.send(model)
        } catch(e){
            console.error(e)
        }
    }

    async getQuizStats(req, res){
        try {
            var model = await ContentModel.find({"videoSpecifications.reviewed":true}).limit(10).sort({"quiz.counter":-1}).select({"quiz.question":1,"quiz.alternatives":1,"quiz.counter":1,"quiz.correct":1}).exec()
            res.send(model)
        } catch(e){
            console.error(e)
        }
    }
}

module.exports = new ContentController();
