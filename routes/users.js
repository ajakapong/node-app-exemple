const express = require('express');
const router = express.Router();
//Controller
const userController = require('../controllers/userController'); 
const { body } = require('express-validator');
const passportJWT = require('../middlewares/passportJWT')


//getProfile
router.get('/me',passportJWT.isLogin, userController.me);

/* GET users listing. */
router.get('/',passportJWT.isLogin, userController.index);

router.post('/register', [
    body('name').not().isEmpty().withMessage('ป้อนข้อมูลชื่อสกุลด้วย'),
    body('email').not().isEmpty().withMessage('ป้อนข้อมูลอีเมล์ด้วย').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('ป้อนข้อมูลรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่านต้องอย่างน้อย 3 ตัวอักษรขึ้นไป'),
] ,userController.register );

//http://localhost:3000/api/users/login
router.post('/login', [
    body('email').not().isEmpty().withMessage('ป้อนข้อมูลอีเมล์ด้วย').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('ป้อนข้อมูลรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่านต้องอย่างน้อย 3 ตัวอักษรขึ้นไป'),
] ,userController.login );


module.exports = router;
