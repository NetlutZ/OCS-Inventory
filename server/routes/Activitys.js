const express = require('express');
const router = express.Router();
const { Activitys } = require('../models');
const { Users } = require('../models');
const { Op, json } = require("sequelize");
const moment = require('moment');

router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        Activitys.findAll({
            include: [Users]
        })
            .then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err)
            });
    }
    else {
        const { activityDate, userId } = req.query;
        const filters = {};
        if (activityDate) {
            const startActivityDate = moment(activityDate.split('to')[0].trim()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
            const endActivityDate = moment(activityDate.split('to')[1].trim()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
            filters.activityDate = {
                [Op.between]: [startActivityDate, endActivityDate]
            }
        }
        if (userId) {
            filters.userId = userId
        }
        Activitys.findAll({
            include: [Users],
            where: filters
        })
            .then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err)
            });
    }
});

router.post('/', (req, res) => {
    Activitys.create({
        activityCode: req.body.activityCode,
        activityDate: req.body.activityDate,
        activityTime: req.body.activityTime,
        userId: req.body.userId,
        device: req.body.device
    }).then((result) => {
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    Activitys.update({
        activityCode: req.body.activityCode,
        activityDate: req.body.activityDate,
        activityTime: req.body.activityTime,
        userId: req.body.userId,
        device: req.body.device
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

router.get('/user/:id', (req, res) => {
    Activitys.findAll({
        where: {
            userId: req.params.id
        },
        include: [Users]
    }).then((result) => {
        res.json(result);
    });

});

// get lastest id that activityCode start with 'L'
router.get('/lastest/loss', (req, res) => {
    Activitys.findOne({
        where: {
            activityCode: {
                [Op.like]: 'L%'
            }
        },
        order: [
            ['id', 'DESC']
        ]
    }).then((result) => {
        res.json(result);
    });
});

router.get('/lastest/borrow', (req, res) => {
    Activitys.findOne({
        where: {
            activityCode: {
                [Op.like]: 'B%'
            }
        },
        order: [
            ['id', 'DESC']
        ]
    }).then((result) => {
        res.json(result);
    });
});

router.get('/lastest/return', (req, res) => {
    Activitys.findOne({
        where: {
            activityCode: {
                [Op.like]: 'R%'
            }
        },
        order: [
            ['id', 'DESC']
        ]
    }).then((result) => {
        res.json(result);
    });
});

// router.get('/', (req, res) => {
//     const {stActivityDate, endActivityDate} = req.query;
//     Activitys.findAll({
//         // include: [Users],
//         where: {
//             activityDate: {
//                     [Op.gte]: stActivityDate+ ' 00:00:00',
//                     [Op.lte]: endActivityDate+' 23:59:59'

//             }
//         }
//     })
//     .then((result)=>{
//         res.json(result)
//     })
// })

module.exports = router;