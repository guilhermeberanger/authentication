//Internal Imports
const app = require('./src/server/server')

//Listen
const port = process.env.PORT || 3000
app.listen(port , () =>{
    console.log(`Listen in port -> ${port}`)
})