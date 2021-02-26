const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const imageUrlProcess = require('../functions/imageUrl')
const token = require('../functions/uuidGenerator')
const {emailSending} = require('../functions/verificationEmail')

module.exports = {
    getProfile: (req, res) => {

        let id = req.user.users.id

        User.findByPk(id, {
            include: {model: Role}
        })
            .then(user => {

                const imagePath = user.dataValues.profile
                const imageUrl = imageUrlProcess.imageUrl(req, imagePath)

                return res.status(200).json({
                    "users": users.responseData(user),
                    "imageUrl": imageUrl,
                    "Roles": user.dataValues.Roles,
                })

            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end getProfile
    profilePic: (req, res) => {

        let id = req.user.users.id
        let {profile} = req.body
        const imagePath = 'upload/images' + '/' + req.file.filename
        const imageUrl = imageUrlProcess.imageUrl(req, imagePath)

        User.findOne({
            where: {id: id}
        })
            .then(user => {

                user.update({
                    profile: imagePath
                })
                    .then(() => {
                        return res.status(201).json({
                            "profile": {
                                "url": imageUrl
                            }
                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end profilePic

    login: async(req, res) => {

        const {password} = req.body

        let loginCreadentials = process.env.login_credentials

        let loginClause = null
        if (loginCreadentials === 'userName') {
            loginClause = { userName: req.body.userName }
        } else if (loginCreadentials === 'email') {
            loginClause = { email: req.body.email }
        }

        User.findOne({ where: loginClause })
            .then(user =>{

                if(!user){
                    return res.status(401).json({
                        "message": "You are not able to login"
                    })
                }
                if (bcrypt.compareSync(password, user.password)) {

                    const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET
                    const data = req.body.userName? req.body.userName :req.body.email;
                    console.log(data)
                    const token = jwt.sign(data, SECRET_KEY)
                    console.log('34',token)

                    return res.status(200).json({
                            "token": "Bearer " + token
                    })

                }//if
                
            }).catch(error => {
                return res.status(400).json({error})
            })

        },

    staticMessage:(req, res) => {
        res.send('Hello World From Controllers')
    },

    emailVerification: (req, res) => {
        const token = req.params.id
        User.findOne({
            where: {
                [Op.and]: {verifyToken: token, emailVerification: false}
            }
        })
            .then(user => {
                user.update({verifyToken: null, emailVerify: true})
                    .then(verify => {
                        return res.status(201).json({
                            "verification": true
                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end verification
    createUser:(req, res) => {

        const verifyToken = token.uuidGenerator()
    
        let {userName,
            email,
            password,
            firstName,
            lastName,
            isSuperuser,
            userPermissions,
            userProfile
        } = req.body
        let hash = bcrypt.hashSync(password, 10)

        User.create(
            {
            userName,
            email,
            password:hash,
            firstName,
            lastName,
            isSuperuser,
            userPermissions,
            userProfile,
            verifyToken:verifyToken
            }
            )
            .then(user => {

               emailSending(email,verifyToken)

                return res.status(422).json({
                    user
                })
            }).catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating"
                })
            })
    },

    getUsers: (req, res) => {
        User.findAll()
            .then(users => {
                return res.status(422).json({
                    users
                })
            })
    }
}