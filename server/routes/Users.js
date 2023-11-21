const {Users} = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Users.findAll().then((result) => {
        res.json(result);
    });
});

router.post('/', (req, res) => {
    Users.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Users.update({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    Users.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

module.exports = router;