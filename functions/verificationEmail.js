const nodemailer = require('nodemailer')

module.exports = {
    emailSending: (email, verifyToken) => {
        console.log(email,verifyToken)

        let transporter = nodemailer.createTransport({
            service:"gmail",
            // host: "smtp.mailtrap.io",
            // port: 2525,
            // secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass:process.env.PASSWORD

                // user: "de7231dadc5a11", // generated ethereal user
                // pass: "86e8bb7bb7d3f2", // generated ethereal password
            },
        });

        let info = transporter.sendMail({
            from: process.env.EMAIL_ADDRESS , // sender address
            to: `${email}`, // list of receivers
            subject: "Welcome", // Subject line
            html: `${verifyToken}`, // html body
        });
    },
}
