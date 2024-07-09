const express = require('express')
const bodyParser = require('body-parser')
const index = require('./router')
const upload = require('./router/upload')
const download = require('./router/download')
const app = express()
const cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    next()
}
app.use(cors)
app.set('view engine','ejs')
app.set('views','./views')
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(index)
app.use('/file',upload)
app.use('/download',download)
app.use(express.static('static'))



app.listen(3000, () => {
    console.log('http://localhost:3000');

})