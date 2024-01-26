const express = require('express');
const router = express.Router();
const authenController = require('../controllers/AuthenJWTController');

router.post('/', authenController.authen);

module.exports = router;