const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');
const { Users } = require('../models');
const { Op } = require("sequelize");

// router.get('/', (req, res) => {
//     Activitys.findAll(
//         {
//             // include: [Users]
//         })
//         .then((result) => {
//             res.json(result);
//         });
// });

router.post('/', (req, res) => {
    Activitys.create({
        activityCode: req.body.activityCode,
        activityDate: req.body.activityDate,
        activityTime: req.body.activityTime,
        userId: req.body.userId
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Activitys.update({
        activityCode: req.body.activityCode,
        activityDate: req.body.activityDate,
        activityTime: req.body.activityTime,
        userId: req.body.userId
    }, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    Activitys.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.get('/:id', (req, res) => {
    Activitys.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json(result);
    });
});

router.get('/:id/user', (req, res) => {
    Activitys.findOne({
        where: {
            id: req.params.id
        },
        include: [Users]
    }).then((result) => {
        res.json(result);
    });
});

router.get('/', (req, res) => {
    const {stActivityDate, endActivityDate} = req.query;
    Activitys.findAll({
        // include: [Users],
        where: {
            activityDate: {
                    [Op.gte]: stActivityDate+ ' 00:00:00',
                    [Op.lte]: endActivityDate+' 23:59:59'
                
            }
        }
    })
    .then((result)=>{
        res.json(result)
    })
})

module.exports = router;