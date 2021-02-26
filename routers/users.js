// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Configuration~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')
const router = express.Router()
const { loginValidators } = require('../validators/users')

const {authVerify} = require('../middleware/auth')
const upload = require('../middleware/upload')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { 
    createUser, 
    getUsers, 
    login,
    getProfile,
    profilePic
 } = require('../controllers/users')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~User Routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.post('/user', createUser)

router.get('/profile',
    authVerify,
    getProfile
)//end

router.put('/profile-pic',
    authVerify,
    upload.single('profile'),
    profilePic
)//end

router.post('/login',
    loginValidators,
    login)
router.get('/getValue1', getUsers)


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Router Export~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = router