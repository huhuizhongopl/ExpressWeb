const express = require('express')
const connection = require('../db')
connection.connect()
let router = express.Router()
router.get('/', function (req, res) {
    console.log('req.query', req.query);
    console.log('req.body', req.body);
    console.log('req.params', req.params);

    connection.query("SELECT * FROM student", (err, results, fields) => {

        if (err) throw err
        res.render('stuGet',{stuList:results})
    })
});
router.post('/', function (req, res) {
    console.log('req.query', req.query);
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    const { id, name, age, gender } = req.body
    connection.query("INSERT INTO student (id, name, age, gender) VALUES (?, ?, ?, ?)", [id, name, age, gender], (err, results, fields) => {

        if (err) throw err
        res.send(results)
    })
})
router.put('/', function (req, res) {
    connection.query("UPDATE student SET name = '555' WHERE id = 1", (err, results, fields) => {

        if (err) throw err
        res.send(results)
    })
})
router.delete('/', function (req, res) {
    const{id}=req.query
    connection.query("DELETE FROM student WHERE id = ?",id, (err, results, fields) => {

        if (err) throw err
        res.send(results)
    })
})
module.exports = router