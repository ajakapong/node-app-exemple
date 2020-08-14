const express = require('express');
const router = express.Router();
//Controller
const staffController = require('../controllers/staffController'); 

router.get('/search', staffController.search );
/* GET users listing. */
router.get('/', staffController.index);

router.get('/:id', staffController.show);

module.exports = router;
