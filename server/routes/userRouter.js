const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//register
router.post('/register', userController.register);
//login
router.post('/login', userController.login);
//google-sign in
router.post('/google-sign-in', userController.googleLogin);
//quotes api
router.get('/quotes', userController.getQuote);
//holidays calendar api
router.get('/holidays', userController.getHolidays);
//imdb
router.get('/movies/:title', userController.getImdb);

module.exports = router;
