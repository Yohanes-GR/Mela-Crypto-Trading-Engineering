const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;