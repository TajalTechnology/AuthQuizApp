const Question_bank = require('../models').Question_bank

module.exports = {

    questionList: (req, res) => {
        Question_bank.findAndCountAll()
            .then(questions => {

                if (!questions) {
                    return res.status(201).json({
                        "message": "Question didn't create"
                    })
                }

                return res.status(201).json({
                    questions
                })
            })
    },

    addQuestion: async (req, res) => {

        let { question, question_types, user_id } = req.body
        let quizs, correct_answer
        if (req.body.question_types !== 'written' && req.body.question_types === 'quiz') {
            quizs = req.body.quizs,
                correct_answer = req.body.correct_answer
        }
        else if (req.body.question_types === 'written' && !req.body.question_types === 'quiz') {
            quizs = null,
                correct_answer = null
        }

        console.log(question, question_types, user_id, quizs, correct_answer);

        Question_bank.create({
            question,
            question_types,
            user_id,
            quizs,
            correct_answer,
        })
            .then(question => {
                if (!question) {
                    return res.status(201).json({
                        "message": "Question didn't create"
                    })
                }

                return res.status(201).json({
                    "message": "Question created",
                    question
                })
            }).catch(error => {
                return res.status(400).json({ error })
            })

    },//end addQuestion.

    updateQuestion: (req, res) => {

        let { question, question_types, status } = req.body
        let id = req.params.id
        let quizs, correct_answer

        if (req.body.quizs) {
            quizs = req.body.quizs,
                correct_answer = req.body.correct_answer
        } else {
            quizs = null,
                correct_answer = null
        }

        Question_bank.findOne({
            where: { id: id }
        })
            .then(questions => {

                if (!questions) {
                    return res.status(401).json({
                        "message": "didn't find any question"
                    })
                }

                questions.update({ question, question_types, status, quizs, correct_answer })
                    .then(update_question => {
                        return res.status(202).json({
                            "message": "Question updated sucessfully",
                            update_question
                        })
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
            where: { id: id }
        })
            .then(question => {

                if (!question) {
                    return res.status(401).json({
                        "message": "Question not found"
                    })
                }
                if (question) {
                    return res.status(200).json({
                        "message": 'Question deleted sucessfully'
                    })
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

// questionTypes: async(req, res) =>{
//     const values = await Question_bank.rawAttributes.question_types.values;
//     return res.status(201).json({
//         values
//     })
// }

// questionList: (req, res) => {

    //     let title = req.query.title
    //     let tag = req.query.tag
    //     let page = parseInt(req.query.page);
    //     page = page ? page : 1
    //     let limit = 10
    //     let offset = page ? (page - 1) * limit : 0;
    //     //sequelize query
    //     let where = [{approval: true}]
    //     title ? where.push({title: {[Op.like]: '%' + title + '%'}}) : !title;
    //     tag ? where.push({tags: {[Op.contains]: [tag]}}) : !tag;

    //     Question.findAndCountAll({
    //         limit: limit,
    //         offset: offset,
    //         where: where,
    //         attributes: ['id', 'title', 'body', 'tags', 'approval', 'viewCount','createdAt', 'updatedAt',
    //             [db.sequelize.fn('COUNT', db.sequelize.col('Answers.id')), 'count']],
    //         include: [
    //             {
    //                 model: User,
    //                 attributes: ['userName']
    //             },
    //             {model: Answer, attributes: []}
    //         ],
    //         group: ['Question.id', 'User.id'],
    //         subQuery: false,
    //     })
    //         .then(questions => {

    //             const totalQuestion = questions.count.length
    //             const totalPage = Math.ceil(totalQuestion / limit);

    //             return res.status(200).json({
    //                 "pagination": {
    //                     "totalPage": totalPage,
    //                     "current_page": page,
    //                     "totalQuestion": totalQuestion,
    //                 },
    //                 "questions": questions.rows,
    //             })//return

    //         }).catch(error => {
    //         return res.status(400).json({error})
    //     })

    // },//end questionList.