const { Users } = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    Users.findAll().then((result) => {
        res.json(result);
    });
});

router.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    Users.create({
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email,
        token: req.body.token,
        role: req.body.role
    })
        .then((result) => {
            res.send({ Register: true });
        })
        .catch((err) => {
            res.send({ Register: false });
        });
});

router.get('/username/:username', (req, res) => {
    Users.findOne({
        where: {
            username: req.params.username
        }
    }).then((result) => {
        res.json(result);
    });
    
});

router.put('/:id', (req, res) => {
    Users.update({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        role: req.body.role
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