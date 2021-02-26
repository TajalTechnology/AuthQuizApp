const { check, body, validationResult } = require('express-validator')
const rules = process.env.login_credentials_rules.split('|')

module.exports = {

    loginValidators: (req, res, next) => {

        let rules = process.env.login_credentials_rules.split('|')
        let message = []
        let stringCheck, lenghtCheck, emailCheck
        let email = req.body.email
        const emailToValidate = req.body.email
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        let userName = req.body.userName

        rules.forEach(element => {

                switch (element.length >= 1) {
                    case (element.includes('email')):

                        if(!emailRegexp.test(emailToValidate)){
                            emailCheck = "Invalid email address"
                            message.push(emailCheck)
                        }

                        break


                    case (element.includes('userName')):

                        if (typeof userName !== 'string') {
                            stringCheck = "This should be string"
                            message.push(stringCheck)
                        }
                        if (typeof userName === 'string') {
                            let lenth = userName.length
                            if (lenth <= 3 || lenth >= 45) {
                                lenghtCheck = "Must be 6 to 45 characters"
                                message.push(lenghtCheck)
                            }
                        }
                        break
                }

            }

        )
        if (message.length === 0) {
            next()
        } else {
            return res.status(422).json({
                message
            })
        }

    }
}