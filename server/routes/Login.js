const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post('/', loginController.loginUser);

module.exports = router;