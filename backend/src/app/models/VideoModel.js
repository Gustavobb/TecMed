const Mongoose = require('mongoose');

const VideoModel = Mongoose.model("video", {

    awsS3: {
        status: Boolean,
        filename: String,
        key: String,
        size: String
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
        alternatives: [String]
    }]
})

module.exports = VideoModel;