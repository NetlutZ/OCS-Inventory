const express = require('express');
const router = express.Router();
const { Rfid } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');

router.get('/', (req, res) => {
    const { rfid, lastScan, อิอิ } = req.query;
    const filters = {};
    if (rfid) {
        filters.rfid = rfid;
    }
    if (lastScan) {
        filters.lastScan = lastScan;
    }
    if (อิอิ) {
        filters.อิอิ = อิอิ;
    }


    Rfid.findAll({
        where: filters
    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

router.post('/', (req, res) => {
    Rfid.create({
        rfid: req.body.rfid,
        lastScan: req.body.lastScan,
        count: req.body.count,
        status: req.body.status,
        อิอิ: req.body.อิอิ
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Rfid.update({
        rfid: req.body.rfid,
        lastScan: req.body.lastScan,
        count: req.body.count,
        status: req.body.status,
        อิอิ: req.body.อิอิ
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

// get rfid that lastscan - now > 10 sec
router.get('/checkloss', (req, res) => {
    const sec = 20000; // 20 sec
    const timeDiff = new Date - sec;

    Rfid.findAll({
        where: {
            lastScan: {
                [Op.lt]: timeDiff
            },
            status: {
                [Op.notIn]: ['Loss', 'Borrowed']
            }
        }
    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

//get id
router.get('/:id', (req, res) => {
    Rfid.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});


module.exports = router;