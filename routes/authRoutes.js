const express = require('express');
const authController = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../validators/authValidator');

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

module.exports = router;
