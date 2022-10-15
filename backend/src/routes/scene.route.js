const express = require('express');
const router = express.Router();
const sceneController = require('../controllers/scene.controller');

router.post('/handlescene', sceneController.handleScene);

module.exports = router;