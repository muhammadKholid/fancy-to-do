const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//register
router.post('/register', userController.register);
//login
router.post('/login', userController.login);
//quotes api
router.get('/quotes', userController.getQuote);
//holidays calendar api
router.get('/holidays', userController.getHolidays);

module.exports = router;
