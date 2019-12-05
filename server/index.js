const routerApi = require('./router')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.use('/api', routerApi)

app.listen(3000)
console.log('success listen at point 3000...')