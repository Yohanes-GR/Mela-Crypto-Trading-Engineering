const express = require('express');
const router = express.Router();
const schemaController = require('../controllers/schema.controller');

router.get('/createtable', schemaController.createTables);

module.exports = router;