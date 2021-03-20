// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~project setup~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Project Name:Authentication and authorization module
// Developer Name:Md Tajal Islam
// Start Date:2/2/21
// End Date:

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~App Configuration~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const envFileConfig = require('dotenv').config()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs")


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Import Routers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const user = require('./routers/users')
const questionbank = require('./routers/questionBanks')
const quiz = require('./routers/quizs')
const answer = require('./routers/answers')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routers Root~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/", (req, res) => res.render("home"))
app.use('/api', user)
app.use('/api', questionbank)
app.use('/api', quiz)
app.use('/api', answer)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Server port~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const port = process.env.PORT
app.listen(port, (req, res) => {
    console.log('App Running on port:'+ `${port}`)
})