var express = require('express');
var router = express.Router();

var authController = require('./../controllers/authController');

/* SignIn */
router.post('/signin', authController.signIn);

/* LogIn */
router.post('/login', authController.logIn);

module.exports = router