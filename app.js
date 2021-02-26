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

// cors setting
const whitelist = [
    'http://localhost/',
    'http://example2.com'
]
const corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    //port
app.listen(process.env.PORT, (req, res) => {
    console.log('App Running on port:' + process.env.PORT)
})


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Import Routers~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const user = require('./routers/users')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routers Root~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/", (req, res) => res.render("home"))
app.use('/api', user)