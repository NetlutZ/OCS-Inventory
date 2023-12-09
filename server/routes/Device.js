const { Device } = require('../models');
const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');

router.get('/', (req, res) => {

    const { name, location, status, purchaseDate, warrantyExpirationDate } = req.query;
    const filters = {};
    console.log(name)
    console.log(typeof(name))
    if (name) {
        // filters.name = name.split(',').map(str => str.trim());
        filters.name = name;
    }
    if (location) {
        // filters.location = location.split(',').map(str => str.trim());
        filters.location = location;
    }
    if (status) {
        // filters.status = status.split(',').map(str => str.trim());
        filters.status = status;

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

router.post('/', (req, res) => {
    Device.create({
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        rfid: req.body.rfid,
        status: req.body.status,
        purchaseDate: req.body.purchaseDate,
        warrantyExpirationDate: req.body.warrantyExpirationDate,
        location: req.body.location,
        activityId: req.body.activityId
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Device.update({
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        room: req.body.room,
        description: req.body.description,
        activityId: req.body.activityId
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

module.exports = router;