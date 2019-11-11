const Mongoose = require('mongoose');

const VideoModel = Mongoose.model("video", {

    awsS3: {
        status: Boolean,
        filename: String,
        key: String,
        size: String
    },

    videoSpecifications: {
        title: String,
        category: String,
        video: String,
        creator: String,
        reviewer: String,
        quiz: {
            question1: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            },
            question2: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            }, 
            question3: {
                level: String,
                question : String,
                answers: {
                    answer1: {
                        text: String,
                        correct: Boolean
                    },
                    answer2: {
                        text: String,
                        correct: Boolean
                    },
                    answer3: {
                        text: String,
                        correct: Boolean
                    }
                },
            }
        }
    }
});

module.exports = VideoModel;