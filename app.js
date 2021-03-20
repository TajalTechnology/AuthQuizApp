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

app.listen(3000, (req, res) => {
    console.log('App Running on port:'+ 3000)
})


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Import Routers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const user = require('./routers/users')
const questionbank = require('./routers/questionBanks')
const quiz = require('./routers/quizs')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routers Root~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/", (req, res) => res.render("home"))
app.use('/api', user)
app.use('/api', questionbank)
app.use('/api', quiz)