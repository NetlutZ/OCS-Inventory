const {Images} = require("../models");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {dirname} = require('path');
const {fileURLToPath} = require('url');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})  

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
            cb(null, true)
        } else {
            cb(new Error('Invalid Mime Type, only JPEG and PNG'), false)
        }
    }
})

// image in upload.single('image') is the name of the input in the form (key in postman)
router.post('/', upload.single('image'), (req, res) => {
    Images.create({
        name: req.file.filename
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/', (req, res) => {
    Images.findAll().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/:id', (req, res) => {
    Images.findByPk(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/display/:name', (req, res) => {
    console.log(__dirname);
    res.sendFile(fileURLToPath(`file:///${__dirname}/../public/images/${req.params.name}`));
});

module.exports = router;