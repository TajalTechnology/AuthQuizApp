// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Configuration~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')
const router = express.Router()
const {authVerify} = require('../middleware/auth')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { 
    signIn,
    signUp, 
 } = require('../controllers/users')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~User Routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post('/sign-in', signIn)
router.post('/sign-up', signUp)


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Export~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = router