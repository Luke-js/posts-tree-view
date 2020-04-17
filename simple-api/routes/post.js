var express = require('express');
var router = express.Router();

const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./posts.json'));

router.get('/', function (req, res, next) {
    res.json(jsonData);
});

module.exports = router;
