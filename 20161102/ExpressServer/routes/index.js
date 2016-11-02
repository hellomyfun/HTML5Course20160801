var express = require('express');
var router = express.Router();
const multer = require("multer");
const upload = multer();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/hello', function (req, res) {
    res.send(`Hello ${req.query.user}`);
});

router.post("/hello", function (req, res) {
    res.send(`Hello ${req.body.user}`);
});

router.post("/upload", upload.none()/*只接受上传文本数据*/, function (req, res) {
    res.send(`Hello ${req.body.user},and your age is ${req.body.age}`);
});

router.post("/hello.json", (req, res)=> {
    let allData = Buffer.alloc(0);
    req.on("data", data=> {
        allData = Buffer.concat([allData, data]);
    });
    req.on("end", ()=> {
        var obj = JSON.parse(allData.toString());
        res.json({message: `Your name is ${obj.user},your age is ${obj.age}`});
    });
});

module.exports = router;
