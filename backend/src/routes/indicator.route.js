const express = require('express');
const router = express.Router();
const indicatorController = require('../controllers/indicator.controller');

router.get('/getindicator', indicatorController.getIndicator);
router.post('/postparam', indicatorController.postIndicatorParam);
router.post('/postindicator', indicatorController.postIndicator);

module.exports = router;