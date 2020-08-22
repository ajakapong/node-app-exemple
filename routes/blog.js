const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController')

//http://localhost:3000/api/blog/
router.get('/', blogController.index );

//http://localhost:3000/api/blog/
router.post('/', blogController.insert );


module.exports = router;
