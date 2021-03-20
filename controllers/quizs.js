const Quiz = require('../models').Quiz
const Question_bank = require('../models').Question_bank

module.exports = {

    quizAdd: (req, res) => {
        let { a, b, c, d, correct_answer, question_id } = req.body

        Quiz.create({
            a,
            b,
            c,
            d,
            correct_answer,
            question_id,
        })
            .then(quizs => {
                return res.status(201).json({
                    quizs
                })//return
            }).catch(error => {
                return res.status(400).json({ error })
            })

    },//end addQuestion.

    quizUpdate: (req, res) => {

        let { a, b, c, d, correct_answer } = req.body
        let id = req.params.id

        Quiz.findOne({
            where: {
                id: id
            }
        })
            .then(quizs => {

                if (!quizs) {
                    return res.status(401).json({
                        "message": "didn't find any quizs"
                    })
                }

                quizs.update({ a, b, c, d, correct_answer })
                    .then(update_quizs => {
                        return res.status(202).json({
                            update_quizs
                        })//return
                    }).catch(error => {
                        return res.status(400).json({ "error": error })
                    })

            }).catch(error => {
                return res.status(400).json({ "error": error })
            })
    },//end updateQuestion.

    quizDelete: (req, res) => {
        let id = req.params.id

        Quiz.destroy({
            where: {
                id: id
            }
        })
            .then(quizs => {
                if (!quizs) {
                    return res.status(401).json({
                        "message": "Question not found"
                    })//return
                }
                if (quizs) {
                    return res.status(200).json({
                        "message": `Question ${id} deleted`
                    })//return
                }
            }).catch(error => {
                return res.status(400).json({ error })
            })
    },//end deleteQuestion.

    getQuizs: (req, res) => {

        let id = req.params.id

        Quiz.findOne({
            where: { id: id },
            include:[{model:Question_bank}]
            
        })
            .then(quizs => {
                if (!quizs) {
                    return res.status(200).json({
                        "message": "Quiz not found"
                    })
                }

                if (quizs) {
                    return res.status(200).json({
                        quizs
                    })
                }
            }).catch(error => {
                return res.status(400).json({ error })
            })
    },//end singleQuestion.

}