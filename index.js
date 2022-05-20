//External Imports
const express = require('express')
const bodyParser = require('body-parser')

//Internal Imports
const router = require('./src/routes/router')

//Instancied Express
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/' , router)

//Listen
const port = process.env.PORT || 3000
app.listen(port , () =>{
    console.log(`Listen in port -> ${port}`)
})