const Answer = require('../models').Answer
const Question_bank = require('../models').Question_bank
const { Op } = require('sequelize')

module.exports = {

    add: async (req, res) => {

        let { question_id } = req.body
        let user_id = 2
        let answer, quiz_answer, score;
        const question_info = await Question_bank.findOne({ where: { id: question_id } })

        if (question_info.question_types === 'written') {
            answer = req.body.answer
            quiz_answer = null
        } else if (question_info.question_types === 'quiz') {
            quiz_answer = req.body.quiz_answer
            answer = null
        } else if (req.body.quiz_answer && req.body.answer) {
            return res.status(201).json({
                "message": "You do not put any answer's at all"
            })
        }

        if (question_info.question_types === "quiz" && question_info.correct_answer.sort().toString() === quiz_answer.sort().toString()) {
            score = 1
        } else {
            score = null
        }

        Answer.create({
            answer,
            score,
            quiz_answer,
            user_id,
            question_id,
        })
            .then(answer => {

                if (!answer) {
                    return res.status(201).json({
                        "message": "answer didn't create"
                    })
                }
                return res.status(201).json({
                    answer
                })
            }).catch(error => {
                return res.status(400).json({ error })
            })
    },//end addQuestion.

    score: async (req, res)=>{
        let user_id = 1
        
        const totalAnswers = await Answer.count({
            where:{ user_id : 1 }
        })

        const totalScores = await Answer.count({
            where:{
                [Op.and]:[
                    {user_id:1},
                    {score:1}
                ]
            }
            
        })

        return res.status(401).json({
            totalAnswers,
            totalScores
        })

    },

    updateQuestion: (req, res) => {

        let { question, question_types, status } = req.body
        let id = req.params.id

        Question_bank.findOne({
            where: {
                id: id
            }
        })
            .then(questions => {

                if (!questions) {
                    return res.status(401).json({
                        "message": "didn't find any question"
                    })
                }

                questions.update({ question, question_types, status })
                    .then(update_question => {
                        return res.status(202).json({
                            update_question
                        })//return
                    }).catch(error => {
                        return res.status(400).json({ "error": error })
                    })

            }).catch(error => {
                return res.status(400).json({ "error": error })
            })
    },//end updateQuestion.

    deleteQuestion: (req, res) => {
        let id = req.params.id

        Question_bank.destroy({
            where: {
                id: id
            }
        })
            .then(question => {
                if (!question) {
                    return res.status(401).json({
                        "message": "Question not found"
                    })//return
                }
                if (question) {
                    return res.status(200).json({
                        "message": `Question ${id} deleted`
                    })//return
                }
            }).catch(error => {
                return res.status(400).json({ error })
            })
    },//end deleteQuestion.

    question: (req, res) => {
        let id = req.params.id

        Question_bank.findOne({
            where: { id: id }
        })
            .then(question => {

                if (question) {

                    return res.status(200).json({
                        question
                    })
                } else {
                    return res.status(200).json({
                        "message": "Question not found"
                    })
                }

            }).catch(error => {
                return res.status(400).json({ error })
            })
    },//end singleQuestion.

}