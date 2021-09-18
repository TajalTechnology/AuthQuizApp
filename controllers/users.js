const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    signIn: (req, res) => {
        const SECRET_KEY = process.env.SECRET_KEY
        let { email, password } = req.body

        User.findOne({
            where: {email: email}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        "message": "You are not register user. Plz Register."
                    })
                }
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const data = {
                            "name": user.name,
                            "email": user.email
                        }
                        const token = jwt.sign(data, SECRET_KEY)
                        return res.status(200).json({
                            "data": {
                                "message": "login success",
                                "token": "Bearer " + token
                            }
                        })
                    }
                    else {
                        return res.status(401).json({
                            "data": {
                                "message": "Password not matches!"
                            }
                        })
                    }
                }
            }).catch(error => {
                return res.status(400).json({ error })
            })

    },//end signIn

    signUp: (req, res) => {

        let { name, email, password } = req.body
        let hash = bcrypt.hashSync(password, 10)
        User.create({ name, email, password: hash, })
            .then(user => {
                if (!user) {
                    return res.status(200).json({
                        "message": "Registration Failed",
                    })
                }
                return res.status(200).json({
                    "message": "Registration suceessfully",
                    user
                })
            }).catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while creating"
                })
            })
    }
}