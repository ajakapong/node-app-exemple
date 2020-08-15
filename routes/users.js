const express = require('express');
const router = express.Router();
//Controller
const userController = require('../controllers/userController'); 

/* GET users listing. */
router.get('/', userController.index);

router.post('/register', userController.register);


module.exports = router;
