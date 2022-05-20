//External Imports
const express = require('express')
const bodyParser = require('body-parser')

//Internal Imports
const router = require('../routes/router')

//Instancied Express
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/' , router)

module.exports = app