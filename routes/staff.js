const express = require('express');
const router = express.Router();
//Controller
const staffController = require('../controllers/staffController'); 

/* GET users listing. */
router.get('/', staffController.index);

module.exports = router;
