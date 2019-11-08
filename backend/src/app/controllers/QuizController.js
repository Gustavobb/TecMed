
const quizModel = require('../models/QuizModel');


class QuizController {

    async sendQuiz(req, res) {

        var quiz1 = new quizModel({
            title: "Minuto ao ponto: SUICÍDIO",
            category: "Suicídio",
            video: "BJXKcwekBA",
            creator: "Raquel Moyses",
            reviewer: "Reviewer 2",
            quiz: {
                question: "Alguns sinais podem indicar que uma pessoa pode estar pensando em se matar:",
                answers: ["Ficar o tempo todo no celular é um sinal comum", "Isolamento e frases negativas sobre si mesmo são comuns", "Na maioria das vezes, não há pistas e nada podemos fazer para evitar o suicídio"],
                correct: "Isolamento e frases negativas sobre si mesmo são comuns"
            }
        })


        var quiz2 = new quizModel({
            title: "O QUE CAUSA RINITE E QUAIS SÃO SEUS SINTOMAS",
            category: "Rinite",
            video: "wFAtV0bvBRo",
            creator: "Raquel Moyses",
            reviewer: "Reviewer 1",
            quiz: {
                question: "Que sintomas eu posso ter que são sinal de rinite?",
                answers: ["Peso na face, dificuldade para respirar", "Saída de secreção (catarro ou água) pelo nariz", "As duas alternativas anteriores estão corretas"],
                correct: "As duas alternativas anteriores estão corretas"
            }
        })

        res.send(quiz2)
    }

    async uploadQuiz(req, res) {
        const title = req.body.title
        const category = req.body.category
        const video = req.body.video
        const creator = req.body.creator
        const reviewer = req.body.reviewer
        const quiz = req.body.quiz

        var quiz1 = new quizModel({
            title: title,
            category: category,
            video: video,
            creator: creator,
            reviewer: reviewer,
            quiz: quiz
        }).save().then(() => {
            console.log("Quiz upado com sucesso!")
        }).catch((err) => {
            console.log("Erro ao salvar quiz no mongo: " + err)
        })
    }
}


module.exports = new QuizController();