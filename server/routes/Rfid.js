const express = require('express');
const router = express.Router();
const { Rfid } = require('../models');

router.get('/', (req, res) => {
    Rfid.findAll()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

router.post('/', (req, res) => {
    Rfid.create({
        tag: req.body.tag,
    }).then((result) => {
        res.json(result);
    });
});


