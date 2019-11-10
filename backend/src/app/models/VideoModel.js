const Mongoose = require('mongoose');

const VideoModel = Mongoose.model("video", {

    awsS3: {
        status: Boolean,
        filename: String,
        key: String,
    },

    videoSpecifications: {
        reviwed: Boolean,
        title: String,
        category: String,
        creator: String,
        reviewer: String
    },

    quiz: [{
        difficulty: String,
        question: String,
        answers: [String],
        correct: String
    }]
})

module.exports = VideoModel;