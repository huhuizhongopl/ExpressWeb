const express = require('express')
let router = express.Router()
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//自定义中间件
function uploadFile(req, res, next) {
    let upload = multer({ dest: "static/" }).any();
    upload(req, res, (err) => {
        console.log('req.files', req.files);
        if (err) {
            res.send("err:" + err);
        } else {
            next();
        }
    })
}
function saveImg(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, async (err, data) => {
            if (err) {
                reject(err)
            }
            // 拓展名
            let extName = file.mimetype.split('/')[1]
            // 拼接成图片名
            let imgName = `${Date.now()}.${extName}`
            // 写入图片
            // 写入自己想要存入的地址
            await fs.writeFile(path.join(__dirname, `../static/${imgName}`), data, err => {
                if (err) { reject(err) }
            });

            // 删除二进制文件
            await fs.unlink(file.path, err => {
                if (err) { reject(err) }
            })
            // 验证是否存入
            await fs.stat(path.join(__dirname, `../static/${imgName}`), err => {
                if (err) { reject(err) }
                // 成功就返回图片相对地址
                resolve(`static\\${imgName}`)
            })
        })
    })
}
router.post('/', uploadFile, function (req, res) {
    console.log('req.body', req.body);
    if (!req.files || Object.keys(req.files).length == 0) {
        res.status(400).send({
            message: '上传失败',
            code: 500
        })
    }
    saveImg(req.files[0]).then(res => {
        res.status(200).send('保存成功' + res)
    }).catch(err => {
        res.status(500).send(err)
    })

})
module.exports = router