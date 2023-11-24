const {Device} = require('../models');
const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');

router.get('/', (req, res) => {
    Device.findAll(
        {
            include: [Activitys]
        })
    .then((result) => {
        res.json(result);
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