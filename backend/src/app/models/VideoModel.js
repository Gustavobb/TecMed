const Mongoose = require('mongoose');

const VideoModel = Mongoose.model("video", {


    videoSpecifications: {
        id: String,
        time: Number,
        reviewed: Boolean,
        title: String,
        description:String,
        category: String,
        creator: String,
        reviewer: String,
        clicked: Number

    },

    quiz: [{
        difficulty: String,
        question: String,
        alternatives: [String]

    }]
})

module.exports = VideoModel;