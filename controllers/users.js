const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    signIn: (req, res) => {
        console.log('Hello');
        const SECRET_KEY = "mdtajalislam1189@gmail.com"
        const {email, password} = req.body

        User.findOne({
            where: {
                email:email
            }
        })
            .then(user => {
                
                if (!user) {
                    return res.status(401).json({
                        "message": "You are not able to login"
                    })
                }//if

                if (user) {

                    if (bcrypt.compareSync(password, user.password)) {

                        const data = {
                            "name":user.name,
                            "email":user.email
                        }
                
                        const token = jwt.sign(data, SECRET_KEY)

                        return res.status(200).json({
                            "data": {
                                "message": "login success",
                                "token": "Bearer " + token
                            }
                        })

                    }//if

                    else {
                        return res.status(401).json({
                            "data": {
                                "message": "Password not matches!"
                            }
                        })
                    }

                }//if
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end signIn


    signUp:(req, res) => {
    
        let {name,
            email,
            password
        } = req.body
        let hash = bcrypt.hashSync(password, 10)

        User.create(
            {
            name,
            email,
            password:hash,
            }
            )
            .then(user => {
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