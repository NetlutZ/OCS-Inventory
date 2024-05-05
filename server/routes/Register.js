const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

router.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const duplicate = await Users.findOne({
        where: {
            username: req.body.username,
        },
    });

    if (duplicate) {
        res.send({ Register: false, error: 'Username already exists' });
        return;
    }

    Users.create({
        username: req.body.username,
        password: hash,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    })
        .then((result) => {
            res.send({ Register: true });
        })
        .catch((err) => {
            res.send({ Register: false });
        });
});

module.exports = router;