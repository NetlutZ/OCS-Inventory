const { Device } = require('../models');
const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');
const multer = require('multer');
const { fileURLToPath } = require('url');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

router.get('/', (req, res) => {

    const { name, location, rfidStatus, purchaseDate, warrantyExpirationDate, rfid } = req.query;
    const filters = {};
    if (name) {
        // filters.name = name.split(',').map(str => str.trim());
        filters.name = name;
    }
    if (location) {
        // filters.location = location.split(',').map(str => str.trim());
        filters.location = location;
    }
    if (rfidStatus) {
        // filters.status = status.split(',').map(str => str.trim());
        filters.rfidStatus = rfidStatus;
    }
    if (rfid) {
        filters.rfid = rfid;
    }
    if (purchaseDate) {
        const startPurchaseDate = moment(purchaseDate.split('to')[0].trim()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        const endPurchaseDate = moment(purchaseDate.split('to')[1].trim()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        filters.purchaseDate = {
            [Op.between]: [startPurchaseDate, endPurchaseDate]
        }
    }
    if (warrantyExpirationDate) {
        const startWarrantyExpirationDate = moment(warrantyExpirationDate.split('to')[0].trim()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        const endWarrantyExpirationDate = moment(warrantyExpirationDate.split('to')[1].trim()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        filters.warrantyExpirationDate = {
            [Op.between]: [startWarrantyExpirationDate, endWarrantyExpirationDate]
        }
    }

    // console.log(filters)
    Device.findAll({
        include: [Activitys],
        where: filters

    })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err)
        });
});

router.post('/', upload.single('image'), (req, res) => {
    let imageData = req.file ? req.file.filename : null;

    Device.create({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        rfid: req.body.rfid,
        rfidStatus: req.body.rfidStatus,
        lastScan: req.body.lastScan,
        purchaseDate: req.body.purchaseDate,
        warrantyExpirationDate: req.body.warrantyExpirationDate,
        location: req.body.location,
        activityId: req.body.activityId,
        image: imageData
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Device.update({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        rfid: req.body.rfid,
        rfidStatus: req.body.rfidStatus,
        lastScan: req.body.lastScan,
        purchaseDate: req.body.purchaseDate,
        warrantyExpirationDate: req.body.warrantyExpirationDate,
        location: req.body.location,
        activityId: req.body.activityId,

    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    Device.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

// get device by id 
router.get('/:id', (req, res) => {
    Device.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

// get device by activityId
router.get('/activity/:id', (req, res) => {
    Device.findAll({
        where: {
            activityId: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.get('/image/:name', (req, res) => {
    // console.log(__dirname);
    res.sendFile(fileURLToPath(`file:///${__dirname}/../public/images/${req.params.name}`));
});

router.get('/check/loss', (req, res) => {
    const sec = 20000; // 20 sec
    const timeDiff = new Date - sec;

    Device.findAll({
        where: {
            lastScan: {
                [Op.lt]: timeDiff
            },
            rfidStatus: {
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

module.exports = router;