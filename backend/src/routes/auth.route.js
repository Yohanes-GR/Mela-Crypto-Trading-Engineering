const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/logout',authController.logout);

module.exports = router;