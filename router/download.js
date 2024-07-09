const express = require('express')
let router = express.Router()
const path = require("path");
const fs = require("fs");
router.get('/', function (req, res) {
    const file = {
        name: '1.png',
        path: 'D:/CodePro/ExpressWeb/static/1720084835583.png'
    }
    let exist = fs.existsSync(path.resolve(file.path))
    if (exist) {
        res.download(file.path)
    } else {
        res.send({
            code: 1,
            msg: '文件不存在'
        })
    }
})
module.exports = router