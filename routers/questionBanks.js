// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Configuration~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')
const router = express.Router()
const {authVerify} = require('../middleware/auth')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { 
    addQuestion,
    updateQuestion,
    deleteQuestion,
    question,
    questionList,
 } = require('../controllers/questionBanks')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~User Routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post('/question-bank', addQuestion);
router.put('/question-bank/:id', updateQuestion);
router.delete('/question-bank/:id', deleteQuestion);
router.get('/question-bank/:id', question);
router.get('/question-bank', questionList);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Export~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = router