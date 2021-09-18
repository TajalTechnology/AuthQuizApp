// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Configuration~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')
const router = express.Router()
const {authVerify} = require('../middleware/auth')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { 
    add,
    score
 } = require('../controllers/answers')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~User Routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post('/answer', add);
router.get('/score', score);

// router.put('/question-bank/:id', updateQuestion);
// router.delete('/question-bank/:id', deleteQuestion);
// router.get('/question-bank/:id', question);
// router.get('/question-types', questionTypes);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Export~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = router