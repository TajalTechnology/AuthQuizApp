const Question_bank = require('../models').Question_bank


module.exports = {

    addQuestion: (req, res) => {
        let {question, question_types, status} = req.body

        Question_bank.create({
            question,
            question_types,
            status,
        })
            .then(question => {

                return res.status(201).json({
                    question
                })//return
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end addQuestion.

    updateQuestion: (req, res) => {

        let {question, question_types, status} = req.body
        let id = req.params.id

        Question_bank.findOne({
            where: {
                id:id
            }
        })
            .then(questions => {

                if(!questions){
                    return res.status(401).json({
                        "message": "didn't find any question"
                    })
                }
                
                questions.update({question, question_types, status})
                    .then(update_question => {
                        return res.status(202).json({
                            update_question
                        })//return
                    }).catch(error => {
                        return res.status(400).json({"error": error})
                    })
                
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },//end updateQuestion.

    deleteQuestion: (req, res) => {
        let id = req.params.id

        Question_bank.destroy({
            where: {
                id:id
            }
        })
            .then(question => {
                if(!question){
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
            return res.status(400).json({error})
        })
    },//end deleteQuestion.

    questionList: (req, res) => {

        let title = req.query.title
        let tag = req.query.tag
        let page = parseInt(req.query.page);
        page = page ? page : 1
        let limit = 10
        let offset = page ? (page - 1) * limit : 0;
        //sequelize query
        let where = [{approval: true}]
        title ? where.push({title: {[Op.like]: '%' + title + '%'}}) : !title;
        tag ? where.push({tags: {[Op.contains]: [tag]}}) : !tag;

        Question.findAndCountAll({
            limit: limit,
            offset: offset,
            where: where,
            attributes: ['id', 'title', 'body', 'tags', 'approval', 'viewCount','createdAt', 'updatedAt',
                [db.sequelize.fn('COUNT', db.sequelize.col('Answers.id')), 'count']],
            include: [
                {
                    model: User,
                    attributes: ['userName']
                },
                {model: Answer, attributes: []}
            ],
            group: ['Question.id', 'User.id'],
            subQuery: false,
        })
            .then(questions => {

                const totalQuestion = questions.count.length
                const totalPage = Math.ceil(totalQuestion / limit);

                return res.status(200).json({
                    "pagination": {
                        "totalPage": totalPage,
                        "current_page": page,
                        "totalQuestion": totalQuestion,
                    },
                    "questions": questions.rows,
                })//return

            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end questionList.
    question: (req, res) => {

        let id = req.params.id

        Question_bank.findOne({
            where: {id: id}
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
            return res.status(400).json({error})
        })
    },//end singleQuestion.

}